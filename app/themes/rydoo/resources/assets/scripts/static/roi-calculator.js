window.$=jQuery;const RoiCalculator=(function(){(function(){if(typeof window.CustomEvent==='function')return false;function CustomEvent(event,params){params=params||{bubbles:false,cancelable:false,detail:undefined,};var evt=document.createEvent('CustomEvent');evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail);return evt;}
CustomEvent.prototype=window.Event.prototype;window.CustomEvent=CustomEvent;})();var _elements;var _values;var _result;var _wizard={currentStep:1,maxSteps:5,formStep:6,};var pricePerCountry={UK:{team:60,growth:84,currency:'GBP',symbol:'£',},DE:{team:72,growth:96,currency:'EUR',symbol:'€',},FR:{team:72,growth:96,currency:'EUR',symbol:'€',},BN:{team:72,growth:96,currency:'EUR',symbol:'€',},ES:{team:72,growth:96,currency:'EUR',symbol:'€',},US:{team:84,growth:108,currency:'USD',symbol:'$',},EU:{team:72,growth:96,currency:'EUR',symbol:'€',},AU:{team:120,growth:144,currency:'AUD',symbol:'A$',},SG:{team:120,growth:144,currency:'SGD',symbol:'S$',},BR:{team:300,growth:360,currency:'BRL',symbol:'R$',},OTHER:{team:84,growth:108,currency:'USD',symbol:'$',},};var _setElements=function(){_elements={paragraph:$('p[data-paragraph]')[0],labels:{expenses:$('[for="calculator-inputs-expenses"]'),employees:$('[for="calculator-inputs-employees"]'),},inputs:{tool:$('[name="calculator-inputs-tool"]'),expenses:$('[name="calculator-inputs-expenses"]'),employees:$('[name="calculator-inputs-employees"]'),location:$('[name="calculator-inputs-location"]'),},buttons:{back:$('#calculator-button-back'),next:$('#calculator-button-next'),calculate:$('#calculator-button-calculate'),},results:{roi:$('#calculator-result-roi'),netSavings:$('#calculator-result-netSavings'),manHours:$('#calculator-result-manHours'),paybackPeriod:$('#calculator-result-paybackPeriod'),},wizard:{header:$('.calculator-module')[0],container:$('#calculator-wizard'),bar:$('#calculator-bar'),numbers:$('#calculator-numbers'),},form:$('#calculateRoiForm'),steps:$('.calculator-module__step'),hubspotInputs:{numemployees:$('.hs-input[name="numemployees"]'),country:$('.hs-input[name="country"]'),},};};var _setEventHandlers=function(){_elements.buttons.next.on('click',_onClickNext);_elements.buttons.back.on('click',_onClickBack);_elements.buttons.calculate.on('click',_onClickCalculate);_elements.inputs.expenses.on('input',{field:'expenses',},_onInputRange);_elements.inputs.employees.on('input',{field:'employees',},_onInputRange);$('#calculator-button-calculate').click(function(){if(!$('.calculator-module__step--step6').length){_onClickSubmitForm();}});$('.calculator-module__step--step6').on('click','.hs-button[type="submit"]',_onClickSubmitForm);};var _setValues=function(){_values={tool:$('[name="calculator-inputs-tool"]:checked').val(),expenses:$('[name="calculator-inputs-expenses"]').val(),employees:$('[name="calculator-inputs-employees"]').val(),location:$('[name="calculator-inputs-location"]').val(),industry:$('[name="calculator-inputs-industry"]').val(),};};var _updateView=function(){Object.keys(_elements.results).forEach(function(item){$(_elements.results[item]).text(_result[item]);});};var _calculatePricePerActiveUserRydoo=function(){var subscription=_values.employees<50?'team':'growth';return pricePerCountry[_values.location][subscription];};var _calculatePricePerActiveUserConcur=function(){var a=8;var b=_values.expenses;var c=7;return(12*a*b)/c;};var _calculateYearlyTimeSavingsExcel=function(){var a=_values.expenses;var b=49;var c=0.19;var d=18;var e=7;var f=1;return 12*((1*a*b+c*d*a)/e-f*a);};var _calculateYearlyTimeSavingsConcur=function(){var a=20;var b=_values.expenses;var c=7;var d=1;return 12*((a*b)/c-d*b);};var _calculateAvgYearlySalary=function(){var avgSalaryPerCountryPerIndustry={UK:{mining:40341,manufacturing:27572,utilities:31866,construction:28702,consumergoods:19662,telecommunication:33335,finance:52206,business:30924,education:31364,healthcare:27798,},DE:{mining:41800,manufacturing:40200,utilities:40400,construction:27450,consumergoods:22900,telecommunication:37150,finance:54600,business:36233,education:34644,healthcare:30200,},FR:{mining:33100,manufacturing:23050,utilities:35350,construction:20700,consumergoods:15900,telecommunication:22450,finance:39500,business:21933,education:21311,healthcare:23200,},BN:{mining:38000,manufacturing:37942,utilities:48250,construction:33567,consumergoods:27700,telecommunication:42175,finance:67800,business:42139,education:39446,healthcare:35700,},ES:{mining:33100,manufacturing:23050,utilities:35350,construction:20700,consumergoods:15900,telecommunication:22450,finance:39500,business:21933,education:21311,healthcare:23200,},US:{mining:105178,manufacturing:67607,utilities:74040,construction:59088.5,consumergoods:46767.66667,telecommunication:106713,finance:82682.5,business:109501.5,education:53375,healthcare:26921.5,},EU:{mining:24800,manufacturing:27350,utilities:29450,construction:23900,consumergoods:19150,telecommunication:30650,finance:47600,business:29767,education:26650,healthcare:26400,},AU:{mining:82436,manufacturing:82436,utilities:82436,construction:82436,consumergoods:82436,telecommunication:82436,finance:82436,business:82436,education:82436,healthcare:82436,},SG:{mining:58308,manufacturing:58308,utilities:58308,construction:58308,consumergoods:58308,telecommunication:58308,finance:58308,business:58308,education:58308,healthcare:58308,},BR:{mining:54000,manufacturing:54000,utilities:54000,construction:54000,consumergoods:54000,telecommunication:54000,finance:54000,business:54000,education:54000,healthcare:54000,},OTHER:{mining:73187.46667,manufacturing:73187.46667,utilities:73187.46667,construction:73187.46667,consumergoods:73187.46667,telecommunication:73187.46667,finance:73187.46667,business:73187.46667,education:73187.46667,healthcare:73187.46667,},};var a=Math.pow(1+0.015,new Date().getFullYear()-2018);var b=avgSalaryPerCountryPerIndustry[_values.location][_values.industry];return a*b;};var _calculateAvgSalaryPerMin=function(){var a=_calculateAvgYearlySalary();var b=52*39*60;return a/b;};var _calculateROI=function(){var calculation;var a=_values.employees;var b=_calculateYearlyTimeSavingsExcel();var c=_calculateAvgSalaryPerMin();var d=_calculatePricePerActiveUserRydoo();var e=_calculateYearlyTimeSavingsConcur();var f=_calculatePricePerActiveUserConcur();if(_values.tool==='excel'){calculation=(a*b*c-a*d)/(a*d);}else if(_values.tool==='concur'){calculation=(a*e*c+a*f-a*d)/(a*d);}
var resultToPercent=Math.round(calculation*100);return resultToPercent;};var _calculateNetSavings=function(){var calculation;var a=_values.employees;var b=_calculateYearlyTimeSavingsExcel();var c=_calculateAvgSalaryPerMin();var d=_calculatePricePerActiveUserRydoo();var e=_calculateYearlyTimeSavingsConcur();var f=_calculatePricePerActiveUserConcur();if(_values.tool==='excel'){calculation=a*b*c-a*d;}else if(_values.tool==='concur'){calculation=a*e*c+a*f-a*d;}
return Math.round(calculation);};var _calculateSavedManHours=function(){var a=_calculateYearlyTimeSavingsExcel();var b=_values.employees;if(_values.tool==='concur'){a=_calculateYearlyTimeSavingsConcur();}
var result=(a*b)/(60*12);var roundedResult=Math.round(result);return roundedResult;};var _calculatePaybackPeriod=function(){var a=_calculatePricePerActiveUserRydoo();var b=_values.employees;var c=_calculateYearlyTimeSavingsExcel();var d=_calculateAvgSalaryPerMin();var result=(a*b)/((b*c*d)/12);var roundedResult=result.toFixed(2);return roundedResult;};var _onClickNext=function(){if(_wizard.currentStep<_wizard.maxSteps){_wizard.currentStep++;_elements.wizard.bar.css('width',(100/_wizard.maxSteps)*_wizard.currentStep+'%');_elements.wizard.numbers.children().eq(_wizard.currentStep-1).addClass('calculate-module-wizard__number--completed');_elements.steps.eq(_wizard.currentStep-2).removeClass('calculator-module__step--active');_elements.steps.eq(_wizard.currentStep-1).addClass('calculator-module__step--active');}
if(_wizard.currentStep===_wizard.maxSteps){_elements.buttons.next.addClass('hidden');_elements.buttons.calculate.removeClass('hidden');_elements.hubspotInputs.country.val(_elements.inputs.location.find(':selected').text());_elements.hubspotInputs.numemployees.val(_calculateNumOfEmployess(_elements.inputs.employees.val()));}
_evaluateGoBackButton(_wizard.currentStep);};var _onClickBack=function(){if(_wizard.currentStep!=1){_wizard.currentStep--;_elements.wizard.bar.css('width',(100/_wizard.maxSteps)*_wizard.currentStep+'%');_elements.wizard.numbers.children().eq(_wizard.currentStep).removeClass('calculate-module-wizard__number--completed');_elements.steps.eq(_wizard.currentStep).removeClass('calculator-module__step--active');_elements.steps.eq(_wizard.currentStep-1).addClass('calculator-module__step--active');}
if(_wizard.currentStep+1==_wizard.maxSteps){_elements.buttons.next.removeClass('hidden');_elements.buttons.calculate.addClass('hidden');}else if(_wizard.currentStep+1==_wizard.formStep){_elements.buttons.calculate.removeClass('hidden');$(_elements.paragraph).removeClass('hidden');_elements.wizard.container.removeClass('hidden');}
_evaluateGoBackButton(_wizard.currentStep);};var _onClickCalculate=function(){_wizard.currentStep++;_elements.buttons.calculate.addClass('hidden');_elements.wizard.container.addClass('hidden');_elements.steps.eq(_wizard.maxSteps-1).removeClass('calculator-module__step--active');_elements.steps.eq(_wizard.maxSteps).addClass('calculator-module__step--active');$(_elements.paragraph).addClass('hidden');};var _finalCalcResult=function(){_setValues();_result={roi:_calculateROI(),netSavings:_calculateNetSavings(),manHours:_calculateSavedManHours(),paybackPeriod:_calculatePaybackPeriod(),};if(!$('.calculator-module__result-symbol').length){_elements.results.roi.after('<span class="calculator-module__result-symbol">%</span>');_elements.results.netSavings.before('<span class="calculator-module__result-symbol">'+pricePerCountry[_values.location]['symbol']+'</span>');}
_updateView();if($('.calculator-module__step--step6').length){_elements.steps.eq(_wizard.maxSteps).removeClass('calculator-module__step--active');_elements.steps.eq(_wizard.maxSteps+1).addClass('calculator-module__step--active');}
if(_values.tool==='concur'){$('.calculator-module__result').eq(3).addClass('hidden');}
_elements.wizard.header.dispatchEvent(new CustomEvent('calculatedResults',{detail:{tool:_values.tool,},}));_animateNumbers();_evaluateGoBackButton(null,true);_elements.paragraph.dispatchEvent(new CustomEvent('remove'));};var _onClickSubmitForm=function(){if(!$('.calculator-module__step--step6').length){_finalCalcResult();}else{window.setInterval(function(){if($('.calculator-module__step--step6 .hbspt-form .submitted-message').length&&!$('.calculator-module__step--final').hasClass('calculator-module__step--active')){_finalCalcResult();clearInterval();}},1000);}};var _onFormSubmit=function(event){var form=$('#'+event.target.id)[0];if(form.dataset.ajaxdone){_onClickSubmitForm();}};var _onInputRange=function(event){_setValues();_elements.labels[event.data.field].text(_values[event.data.field]);};var _animateNumbers=function(){$('.calculator-module__result-val').each(function(){var originalText=$(this).text();$(this).animate({counter:$(this).text(),},{duration:300,easing:'swing',step:function(now){$(this).text(Math.floor(now));},complete:function(){$(this).text(numberWithSeparator(originalText));},});});};function numberWithSeparator(number){return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
var _calculateNumOfEmployess=function(employees){var result;switch(true){case employees<=1:result=1;break;case employees<=20:result=2;break;case employees<=50:result=21;break;case employees<=200:result=51;break;case employees<=500:result=201;break;case employees<=1000:result=501;break;default:result=1001;break;}
return result;}
var _initSelect=function(){$('.input-select').select2({minimumResultsForSearch:Infinity,});};var _evaluateGoBackButton=function(step,overrideAndHide){if(overrideAndHide){_elements.buttons.back.addClass('hidden');}else{if(step==1){_elements.buttons.back.addClass('hidden');}else{_elements.buttons.back.removeClass('hidden');}}};var _initElements=function(){_evaluateGoBackButton(_wizard.currentStep);};var _init=function(){_setElements();_initElements();_setEventHandlers();_initSelect();};var init=function(){_init();};var getHeader=function(){return _elements.wizard.header;};var getParagraph=function(){return _elements.paragraph;};return{header:getHeader,paragraph:getParagraph,init:init,};}());if($('#calculator-module').length>0){RoiCalculator.init();RoiCalculator.header().addEventListener('calculatedResults',function(event){$('.'+event.target.className+' > h1[data-title="default"]').hide();$('.'+event.target.className+' > h1[data-title="'+event.detail.tool+'"]').show();});RoiCalculator.paragraph().addEventListener('remove',function(){$(this).hide();});}
$('#calculator-button-calculate').click(function(){$('.hs-input[name="active_users_roi_calculator"],.hs-input[name="numemployees"]').val($('[name="calculator-inputs-employees"]').val());$('.hs-input[name="jobtitle"]').val($('[name="calculator-inputs-industry"]').val());});