// Asets

const month = [
    {
        "name": 'Arcade',
        "price": 9
    },
    {
        "name": 'Advanced',
        "price": 12
    },
    {
        "name": 'Pro',
        "price": 15
    },
];

const year = [
    {
        "name": 'Arcade',
        "price": 90
    },
    {
        "name": 'Advanced',
        "price": 120
    },
    {
        "name": 'Pro',
        "price": 150
    },
]

const AddOnsPerMo = [
    {
        "name": 'Online service',
        "description": 'Access to multiplayer games',
        "price": 1
    },
    {
        "name": 'Larger storage',
        "description": 'Extra 1TB of cloud save',
        "price": 2
    },
    {
        "name": 'Customizable Profile',
        "description": 'Custom theme on your profile',
        "price": 2
    },
];


const AddOnsPerYo = [
    {
        "name": 'Online service',
        "description": 'Access to multiplayer games',
        "price": 10
    },
    {
        "name": 'Larger storage',
        "description": 'Extra 1TB of cloud save',
        "price": 20
    },
    {
        "name": 'Customizable Profile',
        "description": 'Custom theme on your profile',
        "price": 20
    },
];



// Style and content 

let steps = document.querySelectorAll("#divBox");
let NextBtn = document.querySelector("#Next");
let BackBtn = document.querySelector("#Back"); 

let Input_S2 = document.querySelector("#inputs-S2"); 
let Input_S3 = document.querySelector("#inputs-S3"); 

let IntInfo = document.querySelectorAll(".infos");
let SideBar = document.querySelectorAll(".pointer");
let checkbox_S2 = document.querySelector("#YoMo");


let [FormCheck,counter,S2_Plan_array,S3_Plan_array,state,d] = [0,0,month,AddOnsPerMo,'none','m'];




    // // by default the month will apear on screen!
    
    // set_S2_Choices(month,'none','m');

    // set_S3_Choices(AddOnsPerMo,'m');


    // // S2 / S3 choices setup (html/css)

    checkbox_S2.addEventListener("change", function() {
        SetUp_Page();
    });
    

    
function SetUp_Page(){
        set_S2_Choices(S2_Plan_array,S3_Plan_array,d);
        set_S3_Choices(S3_Plan_array,d);
    if (checkbox_S2.checked) {
        [S2_Plan_array,S3_Plan_array,state,d] = [year,AddOnsPerYo,'block','y']
        set_S2_Choices(S2_Plan_array,S3_Plan_array,d);
        set_S3_Choices(S3_Plan_array,d);
        // Style checkbox S2
        checkbox_S2.previousElementSibling.style.color = "var(--CoolGray)";
        checkbox_S2.nextElementSibling.style.color =  "var(--MarineBlue)";
    } else {
        [S2_Plan_array,S3_Plan_array,state,d] = [month,AddOnsPerMo,'none','m']
        set_S2_Choices(S2_Plan_array,S3_Plan_array,d);
        set_S3_Choices(S3_Plan_array,d);
        // Style checkbox S2
        checkbox_S2.previousElementSibling.style.color = "var(--MarineBlue)";
        checkbox_S2.nextElementSibling.style.color =  "var(--CoolGray)";
    }
    // after Doms
    

    let ChoicesS3 = document.querySelectorAll("#inputs-S3 .choice");
    let ChoicesS2 = document.querySelectorAll("#inputs-S2 .choice");

    // ChoicesS2[0].classList.add('active'); //arcade plan is active by default

    S2_inside_changes(ChoicesS2);

    S3_inside_changes(ChoicesS3);
}











// change/Next/back Swipe 

for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    step.style.left = `${i * 100}%`
}


NextBtn.addEventListener('click',() =>{

    if(checkInfoForm() != 3){
        checkInfoForm();
    }else{
        counter++;
        Realsteps();
    } 
});

BackBtn.addEventListener('click',() =>{
    counter--;
    Realsteps();
});


function Realsteps(){

    // Next/back style and transform

    switch (counter) {
        case steps.length - 1:
            BackBtn.style.visibility = "hidden";
            NextBtn.style.visibility = "hidden";
            break;
        case steps.length - 2:
            NextBtn.textContent = "Confirm";
            break;
        case 0:
            BackBtn.style.visibility = "hidden";
            break;
        // case 1:
        //     SetUp_Page();
        //     SetUp_Page();
        //     break;
    
        default:
            BackBtn.style.visibility = "visible";
            NextBtn.textContent = "Next Step";
            break;
    }

    // transition swipe

    steps.forEach((step) => {
        step.style.transform = `translateX(-${counter * 100}%)`; 
    });

    // sidebar active 

    for (let i = 0; i < SideBar.length; i++) {
        const bar = SideBar[i];
        if(i === counter){
            bar.style.backgroundColor = 'white';
            bar.style.border = '2px solid var(--White)';
            bar.style.color = 'var(--MarineBlue)';
        }else{
            bar.style.backgroundColor = 'transparent';
            bar.style.border = '1px solid var(--White)';
            bar.style.color = 'var(--White)';
        }
    }
    
}


// check the form 

function checkInfoForm(){
    FormCheck = 0;
        IntInfo.forEach((info) =>{
            
            if(info.value == ''){
                info.previousElementSibling.lastElementChild.style.visibility = "visible";
                info.style.borderColor = "var(--StrawberryRed)";
                FormCheck--;
            }else{
                info.previousElementSibling.lastElementChild.style.visibility = "hidden";
                info.style.borderColor = "var(--LightGray)";
                FormCheck++;
            }
        });
    return FormCheck;
}

// check the form end

function  set_S2_Choices(arr,vbility,d) {
    Input_S2.innerHTML ='';
    for (let i = 0; i < arr.length; i++) {
        const choice = arr[i];
        Input_S2.innerHTML += `<span class="choice">
                                    <img src="/assets/images/icon-${choice.name.toLocaleLowerCase()}.svg" alt="">
                                    <div class="More">
                                    <h3>${choice.name}</h3>
                                    <h4>$${choice.price}/${d}o</h4>
                                    <h4 style="color: var(--MarineBlue); padding-top: 5px;
                                    display: ${vbility}';">2 Months free</h4>
                                    </div>
                                </span>`;
    }
}

function  set_S3_Choices(arr,d) {
    Input_S3.innerHTML ='';
    for (let i = 0; i < arr.length; i++) {
        const choice = arr[i];
        Input_S3.innerHTML += `<span class="choice">
                                    <div class="More">
                                        <input type="checkbox" name="plan-${i}">
                                        <label for="plan-${i}">
                                            <h3>${choice.name}</h3>
                                            <h4>${choice.description}</h4>
                                        </label>
                                    </div>
                                    <h4>+$${choice.price}/${d}o</h4>
                                </span>`
    }

}


// S2 / S3 inside changes 

// S2 inside changes 

function S2_inside_changes(arr) {
    for (let i = 0; i < arr.length; i++) {
        const plan = arr[i];
        window.addEventListener("change", function() {
            plan.addEventListener("click", ()=>{
                plan.classList.add('active');
                for (let j = 0; j < 3; j++) {
                    if(j != i){
                        arr[j].classList.remove('active');               
                    }
                }
            });
        });
    }
}

// S3 inside changes 

function S3_inside_changes(arr) {
    for (let i = 0; i < arr.length; i++) {
        const choice = arr[i];
        if (choice.firstElementChild.firstElementChild.checked) {
            choice.classList.add('active');
        } else {
            choice.classList.remove('active');
        }
    }
    
}

