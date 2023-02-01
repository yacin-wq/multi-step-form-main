



// logic 
let changeBtn = document.querySelector(".plane-sum").firstElementChild.lastElementChild;
let ChoicesS3 = document.querySelectorAll("#IntOns");

let planDuration,planeType,planPrice1,planPrice2;

///output 
let planeOut = document.querySelector(".plane-sum"); 
let OnsOut = document.querySelector(".ons-sum"); 
let total = document.querySelector(".total"); 




const month = [
    {
        "name": 'Arcade',
        "price": 9
    },
    {
        "name": 'Advenced',
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
        "name": 'Advenced',
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
        "price": 1
    },
    {
        "name": 'Larger storage',
        "price": 2
    },
    {
        "name": 'Customizable Profile',
        "price": 2
    },
];


const AddOnsPerYo = [
    {
        "name": 'Online service',
        "price": 10
    },
    {
        "name": 'Larger storage',
        "price": 20
    },
    {
        "name": 'Customizable Profile',
        "price": 20
    },
];




// swipe + (next / back) buttons + html 



changeBtn.addEventListener('click',() =>{
    counter = 1;
    Realsteps();
});




// check the form end




// swipe + (next / back) buttons end


// Yo/Mo of S2

function YoTemp(){
    checkboxS2.previousElementSibling.style.color = "var(--CoolGray)";
    checkboxS2.nextElementSibling.style.color =  "var(--MarineBlue)";

    for (let i = 0; i < PlaneMore.length; i++) {
        const More = PlaneMore[i];
        const choice = ChoicesS3[i];
        More.lastElementChild.style.display= 'block';
        More.firstElementChild.nextElementSibling.innerHTML = `<h4>$${year[i].price}/yo</h4>`;
        choice.parentElement.nextElementSibling.innerHTML = `<h4>+$${AddOnsPerYo[i].price}/yo</h4>`
    }
    
    // return AddOnsPerYo[i].price;
    
}

function MoTemp(){
    checkboxS2.previousElementSibling.style.color = "var(--MarineBlue)";
    checkboxS2.nextElementSibling.style.color =  "var(--CoolGray)";

    for (let i = 0; i < PlaneMore.length; i++) {
        const More = PlaneMore[i];
        const choice = ChoicesS3[i];
        More.lastElementChild.style.display= 'none';
        More.firstElementChild.nextElementSibling.innerHTML = `<h4>$${month[i].price}/mo</h4>`;
        choice.parentElement.nextElementSibling.innerHTML = `<h4>+$${AddOnsPerMo[i].price}/mo</h4>`
    }

    // return AddOnsPerMo[i].price;

}


// Yo/Mo of S2 end


//output
function outPutS4() {

    
    // Yo/Mo Swipe checkBox

    for (let i = 0; i < PlaneMore.length; i++) {
        const plan = PlaneMore[i];
        plan.parentElement.addEventListener("click", ()=>{
            plan.parentElement.classList.add('active');

            for (let j = 0; j < 3; j++) {
                if(j != i){
                    PlaneMore[j].parentElement.classList.remove('active');
                }else{
                    planeType = PlaneMore[j].firstElementChild.textContent;
                    planPrice1 = parseInt(PlaneMore[j].children[1].textContent.match(/\d+/)[0]) ;
                }
            }
        });
        if (checkboxS2.checked) {
            YoTemp();
            planDuration = 'Yearly';
        } else {
            MoTemp();
            planDuration = 'Monthly';
        }
        // Yo/Mo Swipe checkBox end
    }

    // S2 CheckBoxes end
    //output


    planPrice2 = 0;
    for (let i = 0; i < OnsOut.childElementCount; i++) {
        const child = OnsOut.children[i];
        planPrice2 +=  parseInt(child.lastElementChild.textContent.match(/\d+/)[0]);
    }


    // Up
    let totalprice = planPrice1 + planPrice2;

    planeOut.firstElementChild.firstElementChild.innerHTML =`<h4>${planeType}(${planDuration})</h4>`;
    planeOut.lastElementChild.innerHTML = `<h5>${planPrice1}/mo</h5>`    
    // Bottom
    total.innerHTML = `<h5>Total (per ${planDuration.replace('ly','')})</h5>
                        <h4>${totalprice}/${planDuration.slice(0,1).toLocaleLowerCase()}o</h4>`;
}
//output end


function S3inS4(){
    // s3 checkboxes in s4

    for (let i = 0; i < ChoicesS3.length; i++) {
        const choice = ChoicesS3[i];
        choice.addEventListener("change", function() {
            if (this.checked) {
                const child = document.createElement("ul");
                child.id = `${i}`;
                child.innerHTML =  `
                                <h5>${choice.nextElementSibling.firstElementChild.textContent}</h5>
                                <h5>${choice.parentElement.nextElementSibling.textContent}</h5>
                                `;
                choice.parentElement.parentElement.classList.add('active');
                OnsOut.appendChild(child);
                
                

            } else {
                choice.parentElement.parentElement.classList.remove('active');
                for (let j = 0; j < OnsOut.children.length; j++) {
                    const childe =  OnsOut.children[j];
                    if(parseInt(childe.id) === i){
                        OnsOut.removeChild(childe);
                    }
                };
            }
        });
    }
    // s3 checkboxes in s4 end
}




// input changes 

window.addEventListener("input",() =>{
    outPutS4();
});









// if (checkboxS2.checked) {
    //     YoTemp();
    //     S3inS4();
    //     planDuration = 'Yearly';
    // } else {
    //     MoTemp();
    //     S3inS4();
    //     planDuration = 'Monthly';
    // }

    // if(counter === steps.length - 1){
    //     BackBtn.style.visibility = "hidden";
    //     NextBtn.style.visibility = "hidden";
    // }else if(counter === steps.length - 2){
    //     NextBtn.textContent = "Confirm";
    // }else if(counter === 0){
    //     BackBtn.style.visibility = "hidden";
    // }else{
    //     BackBtn.style.visibility = "visible";
    //     NextBtn.textContent = "Next Step";
    // }