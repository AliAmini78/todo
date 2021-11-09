// DOM variables
const TitleBox = document.querySelector('#title');
const DescriptionBox = document.querySelector('#desc');
const DateBox = document.querySelector('#date');
const SubmitBtn = document.querySelector('#submit');
const FilterBox = document.querySelector('.filter_box');
const FilterBtn = document.querySelector('#filter_btn');
const RedCheckBox = document.querySelector('#red_label_btn');
const YellowCheckBox = document.querySelector('#yellow_label_btn');
const RedFilterCheckBox = document.querySelector('#red_filter');
const YellowFilterCheckBox = document.querySelector('#yellow_filter');
const GreenFilterCheckBox = document.querySelector('#green_filter');
const BlueFilterCheckBox = document.querySelector('#blue_filter');
const ListSection = document.querySelector('#list');
const MainBox = document.querySelector('.box');
const DescModalBox = document.querySelector('.desc_modal');
const ModalTitle = document.querySelector('#modal_title');
const ModalDesc = document.querySelector('#modal_desc');
const ModalCloseBtn = document.querySelector('#close_modal');
const ModalDeleteBtn = document.querySelector('#modal_delete_btn');


// variables
let TitleText;
let DescText;
let DateVal;
let Status;
let StatusClass;
let Pass = false;
let IsPass;
let IsDoneClass;
let IsDoneCheck
let DataAry;
let IdCounter;
let MainStatus = {
    ItemTime: 0,
    ItemStatus: 0,
}

// local storage
if (localStorage.getItem('id') === null) {
    localStorage.setItem('id', 0);
} else {
    IdCounter = localStorage.getItem('id');
}

if (localStorage.getItem('data') === null) {
    DataAry = []
    localStorage.setItem('data', "[]");
} else {
    DataAry = JSON.parse(localStorage.getItem('data'))
}

//listeners
SubmitBtn.addEventListener('click', GetValue);
FilterBtn.addEventListener('click', FilterBoxFun)
RedCheckBox.addEventListener('click', RedCheckBoxFun);
YellowCheckBox.addEventListener('click', YellowCheckBoxFun);
RedFilterCheckBox.addEventListener('click', RedFilterCheckBoxFun);
YellowFilterCheckBox.addEventListener('click', YellowFilterCheckBoxFun);
GreenFilterCheckBox.addEventListener('click', GreenFilterCheckBoxFun);
BlueFilterCheckBox.addEventListener('click', BlueFilterCheckBoxFun);
ModalCloseBtn.addEventListener('click' , CloseModal);
ModalDeleteBtn.addEventListener('click', DeleteFromModal);


// function
function GetValue() {
    TitleText = TitleBox.value;
    DescText = DescriptionBox.value;
    DateVal = DateBox.value;
    IsPass = EmptyFillError();
    console.log(IdCounter);
    if (IsPass == false) {
        alert("please fill all the blank")
    } else {
        if (RedCheckBox.checked == true) {
            status = 1;
        } else if (YellowCheckBox.checked == true) {
            status = 2;
        } else {
            status = 0;
        }
        let Obj = {
            id: IdCounter++,
            title: TitleText,
            description: DescText,
            date: DateVal,
            status: status,
            IsDone: false,
        }
        localStorage.setItem('id', IdCounter);
        SetData(Obj);
    }
}

function SetData(data) {
    DataAry.push(data);
    localStorage.setItem('data', JSON.stringify(DataAry));
    EmptyFill();
    CrateDOM(DataAry);
}


function Filter() {
    let FilterData = DataAry;
    switch (MainStatus.ItemTime) {
        case 1:
            FilterData = FilterData.filter(item => item.status == 1);
            break;
        case 2:
            FilterData = FilterData.filter(item => item.status == 2);
            break;

        default:
            break;
    }
    switch (MainStatus.ItemStatus) {
        case 1:
            FilterData = FilterData.filter(item => item.IsDone == true);
            break;
        case 2:
            FilterData = FilterData.filter(item => item.IsDone == false);
            break;

        default:
            break;
    }
    CrateDOM(FilterData);
}

function CrateDOM(data) {
    ListSection.innerHTML = "";
    data.forEach(item => {
        switch (item.status) {
            case '1':
                StatusClass = "red_label";
                break;

            case '2':
                StatusClass = "yellow_label";
                break;
            default:
                StatusClass = " ";
                break;
        }
        if (item.IsDone == false) {
            IsDoneClass = " ";
            IsDoneCheck = " ";
        } else {
            IsDoneClass = "done";
            IsDoneCheck = "checked";
        }
        let CreatLi = document.createElement('li');
        CreatLi.innerHTML =
            `
            <div class="right">
            <div class="checkbox" >
                <input type="checkbox" class = "${StatusClass}  done_checkbox"  value="${item.id}" ${IsDoneCheck}>
            </div>
            <div class="desc">
                <p class=${IsDoneClass}>
                ${item.title}
                </p>
                <span class="date">
                ${item.date}
                </span>
            </div>
        </div>
        <div class="btn">
            <button class="info" value="${item.id}">
                <svg id="Capa_1" enable-background="new 0 0 512 512" height="512"
                    viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path
                            d="m60.25 0v512h300.338l91.162-91.162v-420.838zm30 30h331.5v361.625h-90.375v90.375h-241.125zm318.287 391.625-47.162 47.162v-47.162z" />
                        <path d="m120.5 60.25h150.5v30h-150.5z" />
                        <path d="m120.5 301.25h271v30h-271z" />
                        <path d="m120.5 240.976h271v30h-271z" />
                        <path d="m120.5 180.703h271v30h-271z" />
                        <path d="m120.5 120.429h271v30h-271z" />
                        <path d="m120.5 361.5h180.625v30h-180.625z" />
                        <path d="m120.5 421.75h150.5v30h-150.5z" />
                    </g>
                </svg>
            </button>
            <button class="delete" value="${item.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="22.717" height="27.959"
                    viewBox="0 0 22.717 27.959">
                    <path id="Path_2" data-name="Path 2"
                        d="M68.533,3.495H63.727V2.621A2.624,2.624,0,0,0,61.106,0H57.611A2.624,2.624,0,0,0,54.99,2.621v.874H50.184A2.187,2.187,0,0,0,48,5.679V8.737a.874.874,0,0,0,.874.874h.477l.755,15.852a2.618,2.618,0,0,0,2.618,2.5H65.993a2.618,2.618,0,0,0,2.618-2.5l.755-15.852h.477a.874.874,0,0,0,.874-.874V5.679A2.187,2.187,0,0,0,68.533,3.495Zm-11.8-.874a.875.875,0,0,1,.874-.874h3.495a.875.875,0,0,1,.874.874v.874H56.737Zm-6.99,3.058a.437.437,0,0,1,.437-.437H68.533a.437.437,0,0,1,.437.437V7.864H49.747Zm17.118,19.7a.873.873,0,0,1-.873.832H52.724a.873.873,0,0,1-.873-.832L51.1,9.611H67.616Z"
                        transform="translate(-48)" fill="#ff8080"></path>
                </svg>
            </button>
        </div>
            `;
        ListSection.append(CreatLi);

    });
    if (data.length == 0) {
        let span = document.createElement('span');
        span.classList.add("empty_list");
        span.innerHTML = "لیست شما خالی است ";
        ListSection.append(span);
    }
    DoneCheckboxFun()
    ShowDesc();
    Delete();
}

function DoneCheckboxFun() {
    let DoneCheckbox = document.querySelectorAll(".done_checkbox");
    DoneCheckbox.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            let search = DataAry.find(item => item.id == checkbox.value);
            let index = DataAry.indexOf(search);
            if (DataAry[index].IsDone == true) {
                DataAry[index].IsDone = false;
            } else {
                DataAry[index].IsDone = true;
            }
            localStorage.setItem('data', JSON.stringify(DataAry));
            Filter()
        })

    })
}

function Delete() {
    const DeleteBtn = document.querySelectorAll('.delete');
    DeleteBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let search = DataAry.find(item => item.id == btn.value);
            let index = DataAry.indexOf(search);
            DataAry.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(DataAry));
            Filter()
        })
    });

}

function ShowDesc() {
    const InfoBtn = document.querySelectorAll('.info');
    InfoBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let search = DataAry.find(item => item.id == btn.value);
            OpenDescModal(search)
        })
    });
}

// filter box function
function FilterBoxFun() {
    if (FilterBox.classList.contains('filter_box_close')) {
        FilterBox.classList.remove('filter_box_close');
        FilterBox.classList.add('filter_box_open');
    } else {
        FilterBox.classList.remove('filter_box_open');
        FilterBox.classList.add('filter_box_close');
    }
}


// checkbox click functions
function RedCheckBoxFun() {
    YellowCheckBox.checked = false;
}

function YellowCheckBoxFun() {
    RedCheckBox.checked = false;
}

function RedFilterCheckBoxFun() {
    YellowFilterCheckBox.checked = false;
    if (RedFilterCheckBox.checked == true) {
        MainStatus.ItemTime = 1;
    } else {
        MainStatus.ItemTime = 0;
    }
    Filter()
}

function YellowFilterCheckBoxFun() {
    RedFilterCheckBox.checked = false;
    if (YellowFilterCheckBox.checked == true) {
        MainStatus.ItemTime = 2;
    } else {
        MainStatus.ItemTime = 0;
    }
    Filter()
}

function GreenFilterCheckBoxFun() {
    BlueFilterCheckBox.checked = false;
    if (GreenFilterCheckBox.checked == true) {
        MainStatus.ItemStatus = 1;
    } else {
        MainStatus.ItemStatus = 0;
    }
    Filter()
}

function BlueFilterCheckBoxFun() {
    GreenFilterCheckBox.checked = false;
    if (BlueFilterCheckBox.checked == true) {
        MainStatus.ItemStatus = 2;
    } else {
        MainStatus.ItemStatus = 0;
    }
    Filter()
}



//empty the fill function

function EmptyFill() {
    TitleBox.value = "";
    DescriptionBox.value = "";
    DateBox.value = "";
}


// Error  Function

function EmptyFillError() {
    if (TitleText.trim() != "" && DescText.trim() != "" && DateVal.trim() != "")
        Pass = true
    return Pass
}

// description modal function 
function OpenDescModal(item){
    MainBox.classList.add('remove_box');
    DescModalBox.classList.remove('remove_box');
    ModalTitle.textContent = item.title;
    ModalDesc.textContent = item.description;
    ModalDeleteBtn.value = item.id;
}

function  CloseModal() {
    DescModalBox.classList.add('remove_box');
    MainBox.classList.remove('remove_box');
}
function DeleteFromModal() {
    let CurentId = ModalDeleteBtn.value;
    let search = DataAry.find(item => item.id == CurentId.value);
    let index = DataAry.indexOf(search);
    DataAry.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(DataAry));
    Filter()
    DescModalBox.classList.add('remove_box');
    MainBox.classList.remove('remove_box');
}



CrateDOM(DataAry);