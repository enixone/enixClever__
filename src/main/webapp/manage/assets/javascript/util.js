function covertDate(nowT, dataT){
	
	
	let date1 = new Date(nowT);		//현재시간 
	let date2 = new Date(dataT);	//데이터 시간
	
	date1 = date1.setDate(date1.getDate()-1);
	
	if(date2 < date1){
		
		dataT = dataT.substr(0,10);
	}else{
		dataT = dataT.substr(10);
	}
	
	return dataT;
	
}


//숫자가 0인경우 -으로 리턴한다. 리스트 화면등에서 사용함.
function covertCount(str){
	 	
	if(str == "0")	str = "-";
	return str;
}



var money = '1000';  // 변수 선언 
var replacemoney = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


function replaceKB(str){
	str = (str/1024).toFixed(2);
	
	if(str > 9999){
		str = (str/1024).toFixed(2);
	}
	
	
	str = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "KB";
	return str;
}


function setDataDivision(dataList){
	
	if(dataList.length > 0){
		$('#dataDivNoData').attr('style', "display:none;");
		$('#dataDivIng').attr('style', "display:none;");
	}else{
		$('#dataDivNoData').attr('style', "display:'';");
		$('#dataDivIng').attr('style', "display:none;");
	}
	
}

function initDataDivision(){
	$('#dataDivInit').attr('style', "display:none;"); 
	$('#dataDivNoData').attr('style', "display:none;"); 
	$('#dataDivIng').attr('style', "display:'';");
}


function getToday(yr){

        let date = new Date(); 
        let year = date.getFullYear()+yr; 
        let month = new String(date.getMonth()+1); 
        let day = new String(date.getDate()); 

        // 한자리수일 경우 앞에 0을 채워준다. 
        if(month.length == 1){ 
          month = '0' + month; 
        } 
        if(day.length == 1){ 
          day = '0' + day; 
        } 

        return year+'-'+month+'-'+day;
}


function getTotalCount(res){
	
	let retVal = 0;
	if(res.paging != null){
		retVal = res.paging.totalCount;
	}
	return retVal;
        
}

