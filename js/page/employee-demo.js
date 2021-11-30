
class Person{
    Name;
    Age;
    constructor(){}
    getName(){

    }
}

//doi voi viec ke thua thi bat buoc trong ham khoi tao phai su dung lenh super
class Employee extends Person{
     //truong, thuoc tinh, khong can khai bao kieu du lieu
     FullName;
     GenderName = "nam";
     static Address;

     //ham khoi tao, co the co ts dau vao hoac khong
     //khi khoi tao co the truyen hoac khong truyen doi so deu duoc
     constructor(name){
         super();
        //set cac gia tri cho thanh phan trong class
        this.FullName = name;
        //co the gan gia tri cho nhng thuoc tinh ko duoc khai bao truoc
        this.SchoolName = "dai hoc bach khoa ha noi";

     }

     /**
      * Khai bao mot phuong thuc
      * author: vo tien bac (19/11/21)
      */
     getName(){
         return this.FullName;
     }
     /**
      * khai bao 1 phuong thuc tinh
      * @returns
      * 
      */
     static getSchoolName(){
        return "MISA";
     }
 }

 var employee = new Employee();
 var employee = new Employee("Vo Tien Bac");
