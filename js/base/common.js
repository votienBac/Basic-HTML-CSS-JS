


class CommonJS{
    /**
     * dinh dang hien thi thong tin laf ngay/thang/nam
     * @param {Date} date 
     * author: BACVT()
     */
    static formatDateDDMMYY(date){
       
        if(date){
            const newDate = new Date(date);
            let day = newDate.getDate();
            let month = newDate.getMonth()+1;
            let year = newDate.getFullYear();
            day = (day<10)?`0${day}`:day;
            month = (month<10)?`0${month}`:month;
            return  date =`${day}/${month}/${year}`;

        }else{
            return "";
        }
        
    }
}