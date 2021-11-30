

$(document).ready(function(){
   employeePage =  new EmployeePage();
})

class EmployeePage{
    Titlepage  ="Danh sách khách hàng";
    FormMode = null;
    EmployeeIdSelected = null;
    constructor(){
        this.loadData();
        this.initEvents();
    }

    loadData(){

        //xoa du lieu cu
        $('table#tblEmployee tbody').empty();
        //goi api thuc hien lay data -> su dung ajax
        $.ajax({
            type:"GET",
            url: "http://cukcuk.manhnv.net/api/v1/Employees",
            success: function(response){
                if(response){
                    var employees = response;
                    //duyet tung nhan vien co torng mang
                    for(const employee of employees){
                        
                    // build tung tr vaf append vaof tbody cua table
                    let trHTML = $(`<tr>
                                        <td id="test" class="text-align-left" style="width: 100px;">${employee.EmployeeCode}</td>
                                        <td class="text-align-left">${employee.FullName}</td>
                                        <td class="text-align-left" style="width: 50px;">${employee.Gender}</td>
                                        <td class="text-align-center" style="width: 100px;">${CommonJS.formatDateDDMMYY(employee.DateOfBirth)}</td>
                                        <td class="text-align-left" style="width: 100px;">${employee.DepartmentName}</td>
                                        <td class="text-align-right" style="width: 150px;">${employee.Salary}</td>
                                    </tr>`);
                                    trHTML.data("employeeId", employee.EmployeeId);
                                    trHTML.data("employee", employee);
                                    $('table#tblEmployee tbody').append(trHTML);
                    }
                    

                }
            }
        })


    }
    /**
     * gan su kien cho cac thanh phan co trong trang
     * author: bacvt
     */
    initEvents(){

        //button add
        $(`#btnAddEmployee`).click(this.btnAddOnClick.bind(this));

        //button save
        $(`#btnSave`).click(this.saveData.bind(this));
        //row on click
        //row double click

        $(`#btnCloseDialog`).click(this.btnCloseDialogOnClick);
        $('table#tblEmployee tbody').on('dblclick','tr', this.rowOnDblClick.bind(this) );
        $('table#tblEmployee tbody').on('click','tr', this.rowOnClick.bind(this) );
        $(`#btnDelete`).click(this.delete.bind(this));



    
    }
    rowOnClick(sender){
        let currentRow = sender.currentTarget;
        let employeeId = $(currentRow).data('employeeId');
        this.EmployeeIdSelected = employeeId;
        $(currentRow).siblings().removeClass('row-selected');
        currentRow.classList.add('row-selected');


    }
    rowOnDblClick(sender){
        this.FormMode = Enum.FormMode.Update;
        let currentRow = sender.currentTarget;
        let employeeId = $(currentRow).data('employeeId');
        this.EmployeeIdSelected = employeeId;
        //goi api lay chi tiet du lieu
        $.ajax({
            type: "GET",
            url: `http://cukcuk.manhnv.net/api/v1/Employees/${employeeId}`,
            success: function (employee) {
                
                //binding du lieu vao form
                // lay tat ca cac input se binding du lieu vao form -> co attribute[fieldName]
                let inputs = $("input[fieldName]");
                //duyet tung input
                for (const input of inputs) {
                    let fieldName = input.getAttribute("fieldName");
                    let value = employee[fieldName];
                    if(value){
                        input.value = value;
                    }else{
                        input.value = null;
                    }

                }
                //hien thi form du lieu
                $(`#dlgPopup`).show();
                
            }
        });
    }
    btnAddOnClick() {
        
        this.FormMode = Enum.FormMode.Add;
        //gan lai gia tri cho FormMode cua EmployeePage
        //clean du lieu da nhap truoc do
        $('input').val(null);
        //load ma nhan vien moi cho dialog chi tiet
        $.ajax({
            type: "GET",
            url: "http://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
            success: function (response) {
                $(`#txtEmployeeCode`).val(response);
            }
        });
        //hien thi form them moi nhan vien
        $(`#dlgPopup`).show();

    }
    btnCloseDialogOnClick() {
        //clean du lieu da nhap truoc do
        $('input').val(null);
        //load ma nhan vien moi cho dialog chi tiet

        //hien thi form them moi nhan vien
        $(`#dlgPopup`).hide();

    }
    saveData(){
        
        var me = this;
        //validate du lieu - kiem tra du lieu co hop le hay khong
        
        //thuc hien build object thong tin chi tiet cho khach hang
        // lay tat ca cac input se binding du lieu vao form -> co attribute[fieldName]
        let inputs = $("input[fieldName]");
        //duyet tung input
        let employee= {};
        for (const input of inputs) {
            let fieldName = input.getAttribute("fieldName");
            let value = input.value;
            if(value){
                employee[fieldName] = value;
            }            
             
        }
        
        //kiem tra trang thai FormMode them moi hay update
        if(this.FormMode == Enum.FormMode.Add){
            $.ajax({
                type: "POST",
                url: "http://cukcuk.manhnv.net/api/v1/Employees",
                data: JSON.stringify(employee),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    
                    //load lai data
                    me.loadData();
                   //an form chi tiet
                   $(`#dlgPopup`).hide()
                   setTimeout(() => {
                       $(`#toastMsgAddSuccess`).fadeIn();
                   }, 3000);
                }
            });
        }else{
            $.ajax({
                type: "PUT",
                url: `http://cukcuk.manhnv.net/api/v1/Employees/${this.EmployeeIdSelected}`,
                data: JSON.stringify(employee),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                    
                   //load lai data
                   me.loadData();
                   //an form chi tiet
                   $(`#dlgPopup`).hide();
                   $('.m-icon-info').fadeIn(3000);;
                   setTimeout(() => {
                       $('.m-icon-info').fadeOut();
                   }, 3000);
                }
            });
        }

        
    }
    delete(sender){
        let me = this;
        let employeeId = this.EmployeeIdSelected;
        $.ajax({
            type: "DELETE",
            url: `http://cukcuk.manhnv.net/api/v1/Employees/${this.EmployeeIdSelected}`,
            success: function (response) {
                alert('xoa thanh cong!');
                me.loadData();
            }
        });
    }
}

