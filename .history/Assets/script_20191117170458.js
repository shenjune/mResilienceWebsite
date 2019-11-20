//IN THIS FILE: 
// 06. Code for Footer styling for device size
// 04. Code for Email Validation API (requirement for class). 

'use strict';

var department; // not sure we will need this one
var name;
var lastName;
var emailAddress;
var comments;
var x = window.matchMedia("(max-width: 700px)");

//O6. FOOTER
// foot icons
var icon1=$('<a target="_blank" href="http://tiag.net/"><img class= "footerImage center-block" src= "Assets/Images/TIAGlogo.svg" alt= "TIAGlogo"></a>'); 
var icon2=$('<img class= "footerImage" src= "Assets/Images/mresilience_sm_blue.svg" alt= "mresilience_sm_blue">');
var icon3=$('<a target="_blank" href="https://www.facebook.com/mresilience/"><img class= "footerImage" src= "Assets/Images/Facebook.svg" alt="fbLogo"></a>');

// footer text
var p1 = '<p class = "pFooter"> TIAG® is a woman-owned business. DUNS: 065245750.</p>';
var p2 = '<p class= "pFooter"> Corporate Headquarters: (703) 437-7878 Ext. 11911 </p>';
var p3 = '<p class= "pFooter"> Freedom Drive, Suite 1180, Reston, VA 20190 </p>'; 
var p4 = '<p class= "pFooter"> This website is Copyright © 2019 </p>';
var p5 = '<p class= "pFooter"> The Informatics Applications Group, Inc. </p>';

function checkMobile(x){
    if(x.matches) {
        $('#footer-row').empty();
        var mobileMiddle1 = $("<div id= 'footer-body' class= 'col-sm-12'>").appendTo('#footer-row');
            // adding Text
            $(p1).appendTo(mobileMiddle1);
            $(p2).appendTo(mobileMiddle1);
            $(p3).appendTo(mobileMiddle1);
            $('<br>').appendTo(mobileMiddle1);
            $(p4).appendTo(mobileMiddle1);
            $(p5).appendTo(mobileMiddle1);

        var mobileMiddle2 = $("<div style= 'width:100%' class= 'col-sm-12'>").appendTo('#footer-row');
            // adding icons
            $(icon1).appendTo(mobileMiddle2);
            $(icon2).appendTo(mobileMiddle2);
            $(icon3).appendTo(mobileMiddle2);    
    }
    else {
        $('#footer-row').empty();

         // adds first icon to the footer (left)
        var leftSide= $("<div class= 'col-2'>").appendTo('#footer-row');
        $(icon1).appendTo(leftSide);

         // adds footer text to the footer (middle)
        var middleSide= $("<div id= 'footer-body' class= 'col-8'>").appendTo('#footer-row');
        $(p1).appendTo(middleSide);
        $(p2).appendTo(middleSide);
        $(p3).appendTo(middleSide);
        $('<br>').appendTo(middleSide);
        $(p4).appendTo(middleSide);
        $(p5).appendTo(middleSide);
        
         // adds icons to the footer (right)
        var rightSide= $("<div class= 'col-2'>").appendTo('#footer-row');
        $(icon2).appendTo(rightSide);
        $(icon3).appendTo(rightSide);
    }
}

checkMobile(x); // call function at run time
x.addListener(checkMobile); // attatch listener function on state change



//04 CONTACT FORM with Email Validation API//

// function to gather the contact info
function contact() {
    name = $('#user-name').val().trim();
    emailAddress = $('#user-email').val().trim();
    comments = $('#message').val().trim();
};

// Email Validation
var access_key = '7f95822a0882fc130f048a764288d1c1';
var email_address = 'support@apilayer.com';
function validateEmail(cb) {
    // verify email address via AJAX call
    return $.ajax({
        url: 'https://apilayer.net/api/check?access_key=' + access_key + '&email=' + emailAddress,
        dataType: 'jsonp',
        success: function (json) {
            // console.log(json);
            // Access and use your preferred validation result objects
            // console.log(json.format_valid);
            // console.log(json.smtp_check);
            // console.log(json.score);
            // cb(format_valid, smtp_check)
            return json
        }
    });
};

// click event on submit button will get contact() to run
$('#back-form').on('submit', async function (stop) {
    stop.preventDefault();
    contact();
//$('#user-name').empty();

    var validate = await validateEmail();
    // console.log(validate)
    const { format_valid, smtp_check } = validate;

    // if validEmail is true, alert to the user, enter in a valid email
    if (smtp_check === true && format_valid === true) {

        Email.send({
            Host: 'smtp25.elasticemail.com',
            Username: 'marinocarranza@hotmail.com',  
            Password: 'a5b01d0e-fdfe-4593-8205-cb8f0d332406',  
            To: 'jjune@tiag.net',    //my preferred email
            From: 'marinocarranza@hotmail.com',  //user input
            Subject: `${name} PORTFOLIO feedback`,    // user input
            Body: `${name} had this to say: ${comments}    ===>  Write back at ${emailAddress}`   // will come from user input in the comment form
        }).then(
            message => alert("Thank you for your feedback! An mResilience member will get back to you soon!")    // when email sends
        )}else {
        alert('Please provide valid email');    // when email is invalid
    };

    //$('#back-form').reset();
    $("#user-dept").val("");
    $("#user-name").val("");
    $("#user-last-name").val("");
    $("#user-email").val("");
    $("#message").val("");
});
