//checkbox
module.exports = function(cell, onRendered, success, cancel, editorParams){
	var value = cell.getValue(),
	input = document.createElement("input"),
	tristate = editorParams.tristate,
	indetermValue = typeof editorParams.indeterminateValue === "undefined" ? null : editorParams.indeterminateValue,
	indetermState = false;

	input.setAttribute("type", "checkbox");
	input.style.marginTop = "5px";
	input.style.boxSizing = "border-box";

	if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
		for (let key in editorParams.elementAttributes){
			if(key.charAt(0) == "+"){
				key = key.slice(1);
				input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
			}else{
				input.setAttribute(key, editorParams.elementAttributes[key]);
			}
		}
	}

	input.value = value;

	if(tristate && (typeof value === "undefined" || value === indetermValue || value === "")){
		indetermState = true;
		input.indeterminate = true;
	}

	if(this.table.browser != "firefox"){ //prevent blur issue on mac firefox
		onRendered(function(){
			input.focus({preventScroll: true});
		});
	}

	input.checked = value === true || value === "true" || value === "True" || value === 1;

	onRendered(function(){
		input.focus();
	});

	function setValue(blur){
		if(tristate){
			if(!blur){
				if(input.checked && !indetermState){
					input.checked = false;
					input.indeterminate = true;
					indetermState = true;
					return indetermValue;
				}else{
					indetermState = false;
					return input.checked;
				}
			}else{
				if(indetermState){
					return indetermValue;
				}else{
					return input.checked;
				}
			}
		}else{
			return input.checked;
		}
	}

	//submit new value on blur
	input.addEventListener("change", function(e){
		success(setValue());
	});

	input.addEventListener("blur", function(e){
		success(setValue(true));
	});

	//submit new value on enter
	input.addEventListener("keydown", function(e){
		if(e.keyCode == 13){
			success(setValue());
		}
		if(e.keyCode == 27){
			cancel();
		}
	});

	return input;
};