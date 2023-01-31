jQuery.fn.enixForms = function(customOptions) {
    let $this = $(this);
    let isInitialized = false;

    let defaultOption = {
        required : [],
        displayError : false,
        constraints : null
    }

    let options = $.extend({}, defaultOption, customOptions);

    let eventHandler = {
        evtChanged : function() {
            innerFunc.checkValid($(this));
        }
    }

    let targetElement = "input, textarea, select";

    function getElement(name) {
        if (name) {
            return $this.find(targetElement).filter("[name={0}]".format(name));
        } else {
            return $this.find(targetElement);
        }
    }

    let innerFunc = {
        initForms : function() {
            getElement().on("change", eventHandler.evtChanged);
        },
        validation : function() {
            let isValid = true;
            $.each(getElement(), function(index, item) {
				
				if (!isValid) 
					return;

                if (!innerFunc.checkValid(item)) {
                    isValid = false;
                }
            });
            return isValid;
        },
        checkValid : function(item) {
		
            let validatorName, validator;
            let isValid = true;
            let itemName = $(item).attr("name");
            let errors = [];
            let validOption = options[itemName];

            // 설정한 유효성 검사가 없을경우
            if (!validOption) {
                return true;
            }

            for (validatorName in validOption) {
                validator = validators[validatorName];

                if (!validator) {
                    continue;
                }

                errors.push(validator.call(item, validOption[validatorName]));
            }

            // 오류 필터링
            errors = utils.emptyErrorFilter(errors);

            if (options.displayError) {
                if (errors.length > 0) {
					
					errors.unshift("("+item.dataset.name+")");
                    uiHandler.setImpact(item);
                    uiHandler.removeError(item);
                    uiHandler.setError(item, errors);
                } else {
                    uiHandler.removeImpact(item);
                    uiHandler.removeError(item);
                }
            }

            return errors.length == 0;
        },

    }
	
    let uiHandler = {

        setImpact : function(ele) {
            $(ele).addClass("form-control-danger");
        },
        removeImpact : function(ele) {
            $(ele).removeClass("form-control-danger");
        },
        setError : function(ele, errors) {
           // let tag = $('<div class="noticeBox"></div>');
           
           let tag = alert(errors);
           
            var idx = 0;
            for (idx; idx < errors.length; idx++) {				
                $(tag).append('<p class="text-danger error">{0}</p>'.format(errors[idx]));
            }
            let parent = $(ele).closest("div");
            parent.append(tag);
            
        },
        
        removeError : function(ele) {
            let parent = $(ele).closest("div");
            let span = parent.find("span");
            span.remove();
        }
    }
    


    // 1회만 초기화
    if (!isInitialized) {
        innerFunc.initForms();
        isInitialized = true;
    }

    let validators = {
        required : function() {
            let val = $(this).val();

            if (val != null && val.length == 0) {
                return "필수로 입력해야 하는 항목입니다";
            }

            return;
        },
        upper : function() {
            let val = $(this).val();

            if (val != null && !utils.isOnlyUpper(val)) {
                return "대문자만 입력 가능합니다";
            }

            return;
        },
        lower : function() {
            let val = $(this).val();

            if (val != null && !utils.isOnlyLower(val)) {
                return "소문자만 입력 가능합니다";
            }

            return;
        },
        numericOnly : function() {

            let val = $(this).val();

            if (!utils.isNumber(val)) {
                return "숫자만 입력이 가능합니다";
            }
            return;
        },
        length : function(options) {
            let valLength = $(this).val().length;
            let min = options.minLength;
            let max = options.maxLength;

            if (!utils.isNumber(valLength)) {
                return "입력값의 길이를 확인할 수 없습니다.";
            }

            if ((utils.isNumber(min) && valLength < min)) {
                return "입력값은 {0} 보다 길어야 합니다".format(min);
            }

            if ((utils.isNumber(max) && valLength > max)) {
                return "입력값은 {0} 보다 작아야 합니다".format(max);
            }

            return;
        },
        compare : function(options) {
            let src = $(this).val();
            let des = $this.find(targetElement).filter("[name={0}]".format(options.targetName)).val();

            if (src !== des) {
                return "값이 일치하지 않습니다.";
            }

            return;
        },
        userPasson : function() {
			let val = $(this).val();
			let PassregExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
			
			if(!PassregExp.test(val)) {
				return "비밀번호는 최소 8자, 최소 하나의 문자 및 숫자를 입력해야 합니다.";
			}
	
		},
        emailaddr : function() {
			let val = $(this).val();
			var regExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i;
			
			if(!regExp.test(val)) {
				return "이메일 주소가 올바르지 않습니다.";
			}
		},
    }

    let utils = {
        emptyErrorFilter : function(errors) {
            return errors.filter(function(error) {
                return !utils.isEmpty(error);
            });
        },
        isEmpty: function(value) {
            var attr;

            // Null and undefined are empty
            if (!utils.isDefined(value)) {
                return true;
            }

            // functions are non empty
            if (utils.isFunction(value)) {
                return false;
            }

            // Whitespace only strings are empty
            if (utils.isString(value)) {
                return /^\s*$/.test(value);
            }

            // For arrays we use the length property
            if (utils.isArray(value)) {
                return value.length === 0;
            }

            // Dates have no attributes but aren't empty
            if (utils.isDate(value)) {
                return false;
            }

            // If we find at least one property we consider it non empty
            if (utils.isObject(value)) {
                for (attr in value) {
                    return false;
                }
                return true;
            }

            return false;
        },
        isDefined : function(obj) {
            return obj !== null && obj !== undefined;
        },
        isFunction : function(value) {
            return typeof value === "function";
        },
        isString : function(value) {
            return typeof value === "string";
        },
        isNumber : function(value) {
            // return typeof value === "number" && !isNaN(value);
            reg = /^[0-9]+$/;
            return reg.test(value);
        },
        isArray : function(value) {
            return {}.toString.call(value) === "[object Array]";
        },
        isDate : function(obj) {
            return obj instanceof Date;
        },
        isObject : function(obj) {
            return obj === Object(obj);
        },
        isOnlyUpper : function (value) {
            reg = /^[A-Z]+$/;
            return reg.test(value);
        },
        isOnlyLower : function (value) {
            reg = /^[a-z]+$/;
            return reg.test(value);
        },
    }

    return {
        binding : function(jsonData) {
            $.each(jsonData, function(key, value) {
                $this.find('input[name={0}][type=text]'.format(key)).val(value);
                $this.find('input[name={0}][type=hidden]'.format(key)).val(value);
                $this.find('textarea[name={0}]'.format(key)).val(value);
                $this.find('label[name={0}]'.format(key)).html(value);
                $this.find('h4[name={0}]'.format(key)).html(value);
                $this.find('p[name={0}]'.format(key)).html(value);
                $this.find('b[name={0}]'.format(key)).html(value);

                if ($this.find('select[name={0}] option[value="{1}"]'.format(key, value)).length > 0) {
                    $this.find('select[name={0}]'.format(key)).val(value);
                }

                if ($this.find('input[name={0}][type=checkbox]'.format(key)).length > 0) {
                    var checkedValue = value === "Y";
                    $this.find('input[name={0}][type=checkbox]'.format(key)).prop("checked", checkedValue);
                }

                if ($this.find('input[name={0}][type=radio][value="{1}"]'.format(key, value)).length > 0) {
                    $this.find('input[name={0}][type=radio][value="{1}"]'.format(key, value)).click();
                }
            });
        },
        validate : function() {
            return innerFunc.validation();
        },
        toJson : function() {
            return $this.serializeObject();
        },
        find : function(selector) {
            return $this.find(selector);
        }
    }
}