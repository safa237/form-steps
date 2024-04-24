$(document).ready(function(){
    var current_fs, next_fs, previous_fs; 
    var opacity;
    var current = 1;
    
    $(".next").click(function(){
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

       
        if (!validateCheckboxes()) {
            return false;
        }

        if (!validateFields(current_fs)) {
            return false;
        }


       
        next_fs.show();

        current_fs.animate({opacity: 0}, {
            step: function(now) {
                
                opacity = 1 - now;
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({'opacity': opacity});
            },
            duration: 500
        });

    });

    
    $(".required").click(function() {
        var $checkboxes = $(".required");
        var $thisCheckbox = $(this);
        if ($thisCheckbox.is(":checked")) {
            
            $checkboxes.not($thisCheckbox).prop("checked", false);
            hideError();
        }
    });

    // Event handler for input field change
    $(".required").on("input", function() {
        hideError();
    });

    $(".serialNumber").on("input", function() {
        hideError();
    });

    $(".carBodyNumber").on("input", function() {
        hideError();
    });


    function validateFields(fs) {
        var isValid = true;
        var formType = $("input[name='formType']:checked").val(); 
    
        fs.find('.required').each(function(){
            if ($(this).val() === '') {
                isValid = false;
                // Show error message
                showError('You must fill all required fields.');
                return false; // Stop the loop
            }
    
            // Additional validation based on form type
            if (formType === 'individual') {
                var numPieces = parseInt($(this).val());
                if (numPieces < 1) {
                    isValid = false;
                    showError('Number of Pieces for individual must be greater than 0.');
                    return false; // Stop the loop
                }
            } else if 
            
            (formType === 'company') {
                var numPieces = parseInt($(this).val());
                if ( numPieces < 10) {
                    isValid = false;
                    showError('Number of Pieces for company must be greater than or equal to 10.');
                    return false; 
                }
            } 
        });


        fs.find('.carBodyNumber').each(function(){
            if (formType === 'individual' && $(this).find('input').val() === '') {
                isValid = false;
                showError('Car Body Number is required for individual.');
                return false; 
            }
        });
        

        fs.find('.serialNumber').each(function(){
            if (formType === 'company' && $(this).val() === '') {
                isValid = false;
                showError('Serial Number is required for company.');
                return false; 
            } 
        });


        if (fs.index() === 3) {
            var password = $('#pwd').val();
            var confirmPassword = $('#cpwd').val();
            if (password !== confirmPassword) {
                isValid = false;
                showError('Password and Confirm Password must match.');
            }
        }
    
        return isValid;
    }
    

  
    function validateCheckboxes() {
        var checkedCount = $(".required:checked").length;
        
        if (checkedCount !== 1) {
           
            showError('You must select exactly one option.');
            return false;
        }
        return true;

    }

    

    function showError(message) {
        
        $(".error-container").empty();
        
        $("<p class='error-message'></p>")
            .text(message)
            .css("color", "red")
            .appendTo(".error-container");
    }

    function hideError() {
        $(".error-container").empty();
    }

    $("input[name='formType']").change(function() {
        var formType = $(this).val();
        if (formType === 'individual') {
            $(".carBodyNumber").show(); 
            $(".carBodyNumber input").prop("required", true); 
        } else {
            $(".carBodyNumber").hide(); 
            $(".carBodyNumber input").prop("required", false); 
            $(".carBodyNumber input").val(''); 
        }
    });

    
    $(".previous").click(function(){
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

       
        previous_fs.show();

        current_fs.animate({opacity: 0}, {
            step: function(now) {
                opacity = 1 - now;
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({'opacity': opacity});
            },
            duration: 500
        });

      
    });

   




/*modallll */

const section = document.querySelector("section"),
      overlay = document.querySelector(".overlay"),
      showBtn = document.querySelector(".show-modal"),
      closeBtn = document.querySelector(".close-btn");
    showBtn.addEventListener("click", () => section.classList.add("active"));
    overlay.addEventListener("click", () =>
      section.classList.remove("active")
    );
    closeBtn.addEventListener("click", () =>
      section.classList.remove("active")
    );


/**local storage */


var formData = {}; 


var nextButtons = document.querySelectorAll('.next');
nextButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var carManufacturer = document.querySelector('select[name="carManufacturer"]').value;
        var carModel = document.querySelector('select[name="carModel"]').value;
        var carYear = document.querySelector('select[name="carYear"]').value;
        var pieceName = document.querySelector('input[name="pieceName"]').value;
        var numberOfPieces = document.querySelector('input[name="numberOfPieces"]').value;
        var serialNumber = document.querySelector('.serialNumber').value;
        var carBodyNumber = document.querySelector('input[name="carBodyNumber"]').value;
        var uname = document.querySelector('input[name="uname"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var pwd = document.querySelector('input[name="pwd"]').value;
        var unamear = document.querySelector('input[name="unamear"]').value;
        var unameen = document.querySelector('input[name="unameen"]').value;
        var country = document.querySelector('select[name="country"]').value;
        var city = document.querySelector('input[name="city"]').value;
        var neigh = document.querySelector('input[name="neigh"]').value;
        var zip = document.querySelector('input[name="zip"]').value;
        var add = document.querySelector('textarea[name="add"]').value;
        
        formData.pieceName = pieceName;
        formData.numberOfPieces = numberOfPieces;
        formData.serialNumber = serialNumber;
        formData.carBodyNumber = carBodyNumber;
        formData.carManufacturer = carManufacturer;
        formData.carModel = carModel;
        formData.carYear = carYear;
        formData.uname = uname;
        formData.email = email;
        formData.pwd = pwd;
        formData.unamear = unamear;
        formData.unameen = unameen;
        formData.country = country;
        formData.city = city;
        formData.neigh = neigh;
        formData.zip = zip;
        formData.add = add;

        var formDataJSON = JSON.stringify(formData);

       
        localStorage.setItem('formData', formDataJSON);
        console.log("data is ", formData);

        
        loadFormData();
    });
});

// Function to load form data from local storage
function loadFormData() {
    
    var formDataJSON = localStorage.getItem('formData');

    
    if (formDataJSON) {
        
        formData = JSON.parse(formDataJSON); 

       
        document.getElementById("manufacturer").innerText = formData.carManufacturer;
        document.getElementById("carModel").innerText = formData.carModel;
        document.getElementById("modelYear").innerText = formData.carYear;
        
        document.getElementById("pieceName").innerText = formData.pieceName;
        document.getElementById("pieceCount").innerText = formData.numberOfPieces;
        document.getElementById("carBodyNumber").innerText = formData.carBodyNumber;
        document.getElementById("username").innerText = formData.uname;
        document.getElementById("email").innerText = formData.email;
        document.getElementById("password").innerText = formData.pwd;
        
        document.getElementById("country").innerText = formData.country;
        document.getElementById("arabicName").innerText = formData.unamear;
        document.getElementById("englishName").innerText = formData.unameen;
        document.getElementById("city").innerText = formData.city;
        document.getElementById("neighborhood").innerText = formData.neigh;
        document.getElementById("zipCode").innerText = formData.zip;
        document.getElementById("address").innerText = formData.add;
    }
}

window.onload = loadFormData;



});