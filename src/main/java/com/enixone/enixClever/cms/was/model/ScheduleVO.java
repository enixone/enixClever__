package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

public class ScheduleVO extends VO {
    private String scheduleId;
    private String shceduleName;
    private String className;
    private String scheduleCron;
    private String displayCron;

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getShceduleName() {
        return shceduleName;
    }

    public void setShceduleName(String shceduleName) {
        this.shceduleName = shceduleName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getScheduleCron() {
        return scheduleCron;
    }

    public void setScheduleCron(String scheduleCron) {
        this.scheduleCron = scheduleCron;
    }

    public String getDisplayCron() {
        return displayCron;
    }

    public void setDisplayCron(String displayCron) {
        this.displayCron = displayCron;
    }
}
