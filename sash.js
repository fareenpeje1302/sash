//  SHOW AND HIDE PASSWORD//
function myFunction1() {
    var x = document.getElementById("current");
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function myFunction2() {
    var x = document.getElementById("New");
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function myFunction3() {
    var x = document.getElementById("Confirm");
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function myFunction4() {
    var x = document.getElementById("facebook");
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function myFunction5() {
    var x = document.getElementById("instagram");
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function myFunction6() {
    var x = document.getElementById("twitter");
    if(x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
//validation for edit password//
$("#form1").submit(function(e){
    e.preventDefault();
var current=document.getElementById("current").value;
var new1=document.getElementById("New").value;
var confirm=document.getElementById("Confirm").value;

if(current.length>0)
{
    if(new1.length>0)
    {
        if(confirm.length>0)
        {
            alert("Updated");
        }
        else{
            alert("confirm your password");
        }
    }
    else{
        alert("write your new password");
    }
}
else{
    alert("write your current password");
}

})
//validation for  edit profile form//
$("#form2").submit(function(e){
    e.preventDefault();
	var letters1=/^[A-Za-z]+$/;
   //regular expression regex//
    var letters2 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var letters3=/^[0-9]+$/;
    var email=  document.getElementById("email").value;
	var fname=document.getElementById("fname").value;
	var lname=document.getElementById("lname").value;
    var pnumber=document.getElementById('contact').value;
    var text=document.getElementById('textarea').value;
    var website=document.getElementById('web').value;
    var select1=document.getElementById('date').value;
    var select2=document.getElementById('month').value;
    var select3=document.getElementById('year').value;

    if(fname.length>0 && fname.match(letters1))
    {
        if(lname.length>0 && lname.match(letters1))
        {
            if(email.length>0 && email.match(letters2))
            {
                if(pnumber.length>0 && pnumber.match(letters3))
                {
                    if(text.length>0 && text.match(letters1))
                    {
                        if(website.length>0)
                        {
                            if(select1.length>0)
                            {
                                if(select2.length>0)
                                {
                                    if(select3.length>0)
                                    {
                                        alert("saved");
                                    }
                                    else{
                                        alert("select year");
                                    }
                                }
                                else{
                                    alert("select month");
                                }
                            }
                            else{
                                alert("select date");
                            }
                        }

                        else{
                            alert("enter website");
                        }
                    }
                    else{
                        alert("Enter boi");
                    }
                }
                else{
                    alert("Enter phone number");
                }
            }
            else{
                alert("Enter your email");
            }
        }
        else{
            alert("Enter last name");
        }
    }
    else{
        alert("Enter first name");
    }
})
//validation for 3rd form
$("#form3").submit(function(e){
    e.preventDefault();
    var fb=document.getElementById("facebook").value;
    var inst=document.getElementById("instagram").value;
    var twit=document.getElementById("twitter").value;

    if(fb.length>0)
    {
        if(inst.length>0)
        {
            if(twit.length>0)
            {
                alert("Saved")
            }
            else{
                alert("write your twitter password");
            }
        }
        else{
            alert("write your instagram password");
        }
    }
    else{
        alert("write your facebook password");
    }
})