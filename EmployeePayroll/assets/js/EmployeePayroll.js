class EmployeePayrollData{
    get id(){ return this._id;}
    set id(id){
        this._id=id;
    }
    get name(){return this._name;}
    set name(name){
        let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if(nameRegex.test(name))
        this._name=name;
        else throw 'Name is incorrect!';
    }
    get profilePic(){return this._profilePic;}
    set profilePic(profilePic){
        this._profilePic=profilePic;
    }
    get gender(){return this._gender;}
    set gender(gender){
        this._gender=gender;
    }
    get department(){return this._department;}
    set department(department){
        this._department=department;
    }
    get salary(){return this._salary;}
    set salary(salary){
        this._salary=salary;
    }
    get note(){return this._note;}
    set note(note){
        this._note=note;
    }
    get startDate(){return this._startDate;}
    set startDate(startDate){
        this._startDate=startDate;
    }
    toString(){
        const options={year:'numeric',month:'long',day:'numeric'};
        const empDate= !this.startDate ? "undefined":
        this.startDate.toLocaleDateString("en-US",options);
        return "id="+this.id+", name='"+this.name+", gender='"+this.gender+
        ", profilePic='"+this.profilePic+", department="+this.department+
        ", salary="+this.salary+",startDate="+empDate+",  note="+this.note;
    }
}
    window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.ariaValueMax.length==0){
            textError.textContent="";
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.ariaValueMax;
            textError.textContent="";
        }catch(e){
            textError.textContent=e;
        }
        const  salary=document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent=salary.value;
        salary.addEventListener('input',function(){
            output.textContent=salary.value;
        });
    });
}

    //UC3

    const save=()=>{
        try{
            let EmployeePayrollData=createEmployeePayroll();
        }catch(e){return;}
    }
    const createEmployeePayroll=()=>{
        let employeePayrollData=new EmployeePayrollData();
        try{
            employeePayrollData.name=getInputValueById('#name');
        }catch(e){
            setTextValue('.text-error',e);
            throw e;
        }
        employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop;
        employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
        employeePayrollData.department=getSelectedValues('[name=department]');
        employeePayrollData.salary=getInputValueById('#salary');
        employeePayrollData.note=getInputValueById('#notes');
        let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
        employeePayrollData.date=Date.parse(date);
        alert(employeePayrollData.toString());
        return employeePayrollData;
    }
    const getSelectedValues=(propertyValue)=>{
        let allItems=document.querySelectorAll(propertyValue);
        let sellItems=[];
        allItems.forEach(item=>{
            if(item.checked) sellItems.push(item.value);
        });
        return sellItems;
    }
    const getInputValueById=(id)=>{
        let value = document.querySelector(id).value;
        return value;
    }
    const getInputElementValue=(id)=>{
        let value=document.getElementById(id).value;
        return value;
    }

    //UC4

    const save=()=>{
        try{
            let employeePayrollData=createEmployeePayroll();
            createAndUpdateStorage(employeePayrollData);
        }catch(e){return;}
    }
    function createAndUpdateStorage(employeePayrollData){
        let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
        if(employeePayrollList != undefined){
            employeePayrollList.push(EmployeePayrollData);
        }else{
            employeePayrollList=[EmployeePayrollData]
        }
        alert(employeePayrollList.toString());
        localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
    }

    const resetForm=(){
        setValue('#name','');
        unsetSelectedValues('[name=profile]');
        unsetSelectedValues('[name=gender]');
        unsetSelectedValues('[name=department]');
        setValue('#salary','');
        setValue('#notes','');
        setValue('#day','');
        setValue('#month','January');
        setValue('#year','2020');
    }
    const unsetSelectedValues=(propertyValue)=>{
        let allItems=document.querySelectorAll(propertyValue);
        allItems.forEach(item=>{
            item.checked=false;
        });
    }
    const setTextValue=(id,value)=>{
        const element = document.querySelector(id);
        element.textContent=value;
    }
    const setValue=(id,value)=>{
        const element=document.querySelector(id);
        element.value=value;
    }
    

