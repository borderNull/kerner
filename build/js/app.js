document.addEventListener('DOMContentLoaded', function () {

    let list = document.querySelector('.content-list');

    list.addEventListener('click', function (e) {

        let target = e.target,
            item = target.closest('.content-list__item')

        if (item) {

            let modal = document.querySelector('.modal'),
                modalClose = document.querySelector('.modal__close')

            modal.classList.add('visible')

            modalClose.addEventListener('click', function () {
                modal.classList.remove('visible')
            })
        }
    })

    function form() {

        $.extend($.validator.messages, {
            required: 'Это поле обязательно для заполнения.',
            name: 'Please specify your name',
            remote: 'Please fix this field.',
            email: 'Enter correct E-Mail',
            url: 'Please enter a valid URL.',
            date: 'Please enter a valid date.',
            dateISO: 'Please enter a valid date (ISO).',
            number: 'Введите число.',
            digits: 'Допустимо вводить только цифры.',
            creditcard: 'Please enter a valid credit card number.',
            equalTo: 'Please enter the same value again.',
            accept: 'Please enter a value with a valid extension.',
            maxlength: jQuery.validator.format('Please enter no more than {0} characters.'),
            minlength: jQuery.validator.format('Please enter at least {0} characters.'),
            rangelength: jQuery.validator.format('Please enter a value between {0} and {1} characters long.'),
            range: jQuery.validator.format('Please enter a value between {0} and {1}.'),
            max: jQuery.validator.format('Please enter a value less than or equal to {0}.'),
            min: jQuery.validator.format('Please enter a value greater than or equal to {0}.')
        });

        $('form').each(function () {

            const $form = $(this);
            const $button = $form.find('button[type="submit"]');
            const $success = $form.find('.form__success');

            $.validator.methods.name = function (value, element) {
                    return this.optional(element) || /[a-zA-Zа-яА-Я]+/.test(value);
                },

                $form.validate({
                    rules: {
                        name: {
                            required: true,

                        },
                        email: {
                            required: true
                        },
                    },
                    messages: {
                        name: "Please enter your name",
                        email: {
                            required: "Enter correct E-Mail",
                        },
                        checkbox: "Please confirm agreement"
                    },
                    debug: true,
                    errorPlacement: function(error,element) {
                        error.appendTo(element.parent('.input-placeholder'))
                    }
                });

            
            $form.on('submit', function (e) {

                e.preventDefault();

                const form = e.target;

                if (!$(form).valid()) {
                    return false;
                }

                $success.html('Sendindg...');
                $button.attr('disabled', true);

                $.ajax({
                    url: $form.attr('action'),
                    method: 'POST',
                    data: $form.serialize(),
                    dataType: 'json',
                    success: function (response) {
                        console.log(response);
                         $success.css('display','block');
                        $success.html('Thank you! Your application was successfully sent!');
                        $success.removeClass('error');
                    },
                    error: function (xhr, ajaxOptions, error) {
                        console.log('Data could not be saved.' + error.message);
                         $success.css('display','block');
                        $success.addClass('error');
                        $success.html('Error saving data, try to enter correct data again. If the error recurs - contact us.');

                    },
                    complete: function () {
                        //$success.show();
                        $button.attr('disabled', false).text('Send');
                    }
                });



            });
        });
    }
    form();
})