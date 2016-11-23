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
        $('input[required], select[required], textarea[required]').focusin(function (event)
        {
            errorMsg(this, 'remove');
        });
        $('input[required], select[required], textarea[required]').bind('blur', function ()
        {
            if (getValue(this).length === 0)
            {
                errorMsg(this, 'required');
            }
        });
        $('input[required], select[required], textarea[required]').bind('keyup', function (event)
        {
            if (event.keyCode !== 9)
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
                $(this).find("input[type='submit']").attr("disabled");
            }
            else
            {
                $(this).find("input[type='submit']").removeAttr("disabled");
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
            if ($(elem).val().length === 0)
            {
                errorMsg(elem, 'required');
            }
            else
            {
                if (getValue(elem).length > 1)
                {
                    var type = getType(elem);
                    switch (type)
                    {
                        case "text":
                            fieldVal(elem);
                            break;
                        case "password":
                            fieldVal(elem);
                            break;
                        case "radio":
                            fieldVal(elem);
                            break;
                        case "checkbox":
                            fieldVal(elem);
                            break;
                        case "email":
                            emailVal(elem);
                            break;
                    }
                }
            }
        }

        function fieldVal(elem)
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
                }
                else
                {
                    errorMsg(elem, 'remove');
                }
            }
        }

        function emailVal(elem)
        {
            if (getValue(elem).length == 0)
            {
                errorMsg(elem, 'required');
            }
            else
            {
                if (!emailValid(elem))
                {
                    errorMsg(elem, 'email');
                }
                else
                {
                    errorMsg(elem, 'remove');
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
                    var btn = parentElem.find("input[type=submit]");
                    $(btn).attr("disabled", true);
                    break;
                case "email":
                    $(elem).addClass("invalid-field");
                    $(elem).next('.valid-block').html("").append("<span>Please fill with valid E-Mail.</span>");
                    var parentElem = $(elem).parents("form");
                    var btn = parentElem.find("input[type=submit]");
                    $(btn).attr("disabled", true);
                    break;
                case "remove":
                    $(elem).removeClass("invalid-field");
                    $(elem).next('.valid-block').html("");
                    var parentElem = $(elem).parents("form");
                    var formValid = checkHasClass(parentElem);
                    if (formValid)
                    {
                        var btn = parentElem.find("input[type=submit]");
                        $(btn).attr("disabled", false);
                    }
                    break;
            }
        }
    }, 1000);
});
