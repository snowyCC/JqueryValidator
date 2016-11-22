/* 
 * @license CrossCode Technologies Pvt Ltd v1.0
 * Validator using Jquery on 18-11-2016
 * CrossCode Technologies Pvt Ltd.,Bangalore.
 * Created By: Ezhil Kumar
 * Description: plugin for html form validation 
 * 
 * Example:: 
 */
$(document).ready(function ()
{
    setTimeout(function ()
    {
//        Text Box with Required attribute
        $('input[required]').bind('focus', function ()
        {
            if (getValue(this).length == 0)
            {
                errorMsg(this, 'remove');
            }
        });
        $('input[required]').bind('blur', function ()
        {
            if (getValue(this).length == 0)
            {
                errorMsg(this, 'required');
            }
        });

        $('input[required]').bind('keyup', function ()
        {
            fieldCheck(this);
        });

//        Select Box with Required Field
        $('select[required]').bind('focus', function ()
        {
            if (getValue(this).length == 0)
            {
                errorMsg(this, 'remove');
            }
        });
        $('select[required]').bind('blur', function ()
        {
            if (getValue(this).length == 0)
            {
                errorMsg(this, 'required');
            }
        });

        $('select[required]').bind('keyup', function ()
        {
            fieldCheck(this);
        });

//        Textarea Box with Required Field
        $('textarea[required]').bind('focus', function ()
        {
            if (getValue(this).length == 0)
            {
                errorMsg(this, 'remove');
            }
        });
        $('textarea[required]').bind('blur', function ()
        {
            if (getValue(this).length == 0)
            {
                errorMsg(this, 'required');
            }
        });

        $('textarea[required]').bind('keyup', function ()
        {
            fieldCheck(this);
        });


        $("form").on("submit", function ()
        {
            var result = true;
            $(this).find('input[required]').each(function ()
            {
                result = fieldCheck(this);
            });
            $(this).find('select[required]').each(function ()
            {
                result = fieldCheck(this);
            });
            $(this).find('input[type="email"]').each(function ()
            {
                result = emailValid(this);
            });
            $(this).find('textarea[required]').each(function ()
            {
                result = fieldCheck(this);
            });
            if (!result)
            {
                $(this).find("button[type='submit']").attr("disabled");
            }
            else
            {
                $(this).find("button[type='submit']").removeAttr("disabled");
            }

        });


        $("form").on("reset", function ()
        {
            $(this).find('input[required]').each(function ()
            {
                errorMsg(this, 'remove');
            });
            $(this).find('select[required]').each(function ()
            {
                errorMsg(this, 'remove');
            });
            $(this).find('textarea[required]').each(function ()
            {
                errorMsg(this, 'remove');
            });
        });

        function fieldCheck(elem)
        {
            var resultPatrn = true;
            if ($(elem).val().length == 0)
            {
                errorMsg(elem, 'required');
                resultPatrn = false;
            }
            else
            {
                if (getValue(elem).length > 1)
                {
                    var type = getType(elem);
                    if (type == "text" || type == "password"||type == "radio"||type == "checkbox")
                    {
                        var patternMatch = patternCheck(elem);
                        if (patternMatch !== null)
                        {
                            if (!patternMatch)
                            {
                                if (getValue(elem).length == 0)
                                {
                                    errorMsg(elem, 'required');
                                }
                                else
                                {
                                    errorMsg(elem, 'pattern');
                                }
                                resultPatrn = false;
                            }
                            else
                            {
                                errorMsg(elem, 'remove');
                            }
                        }
                    }
                    if (type == 'email')
                    {
                        if (getValue(elem).length == 0)
                        {
                            errorMsg(elem, 'required');
                        }
                        else
                        {
                            var eRess=emailValid(elem);
                            if(eRess){
                                 errorMsg(elem, 'email');
                            }
                            else{
                                errorMsg(elem, 'remove');
                            }
                        }
                    }
                }
            }
        }

        function patternCheck(elem)
        {
            if ($(elem).attr("pattern"))
            {
                var value = getValue(elem).toString();
                var pattern = new RegExp(getPattern(elem).toString());
                return pattern.test(value);
            }
            else
            {
                return null;
            }
        }
        function emailValid(elem)
        {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test($(elem).val());
        }
        function getValue(ele)
        {
            return $(ele).val();
        }
        function getType(ele)
        {
            return $(ele).attr("type");
        }
        function getPattern(ele)
        {
            return $(ele).attr("pattern");
        }
        function checkHasClass(formElem)
        {
            var valid = true;
            $(formElem).find('input').each(function ()
            {
                if ($(this).hasClass("invalid-field"))
                {
                    valid = false;
                    return valid;
                }
            });
            $(formElem).find('select').each(function ()
            {
                if ($(this).hasClass("invalid-field"))
                {
                    valid = false;
                    return valid;
                }
            });
            return valid;
        }
        function errorMsg(elem, errorType)
        {
            switch (errorType)
            {
                case "required":
                    $(elem).addClass("invalid-field");
                    $(elem).next('.valid-block').html("").append("<span>This is required field.</span>");
                    var parentElem = $(elem).parents("form");
                    var btn = parentElem.find("input[type=submit]");
                    $(btn).attr("disabled", true);
                    break;
                case "pattern":
                    $(elem).addClass("invalid-field");
                    $(elem).next('.valid-block').html("").append("<span>Please fill with specific format.</span>");
                    var parentElem = $(elem).parents("form");
                    var btn = parentElem.find("button[type=submit]");
                    $(btn).attr("disabled", true);
                    break;
                case "email":
                    $(elem).addClass("invalid-field");
                    $(elem).next('.valid-block').html("").append("<span>Please fill with valid E-Mail.</span>");
                    var parentElem = $(elem).parents("form");
                    var btn = parentElem.find("button[type=submit]");
                    $(btn).attr("disabled", true);
                    break;
                case "remove":
                    $(elem).removeClass("invalid-field");
                    $(elem).next('.valid-block').html("");
                    var parentElem = $(elem).parents("form");
                    var formValid = checkHasClass(parentElem);
                    if (formValid)
                    {
                        var btn = parentElem.find("button[type=submit]");
                        $(btn).attr("disabled", false);
                    }
                    break;
            }
        }
    }
    , 1000);
});
