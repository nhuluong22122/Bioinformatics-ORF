function reverse(s){
	var o = '';
  	for (var i = s.length - 1; i >= 0; i--){
   	 	o += s[i];
  	}
 	return o;
}
function validateFasta(fasta) {
	if (!fasta) { // check there is something first of all
		return false;
	}
	// immediately remove trailing spaces
	fasta = fasta.trim();
	// split on newlines... 
	var lines = fasta.split('\n');
	// check for header
	if (fasta[0] == '>') {
		// remove one line, starting at the first position
		lines.splice(0, 1);
	}
	// join the array back into a single string without newlines and 
	fasta = lines.join('').trim();
	// trailing or leading spaces
	if (!fasta) { // is it empty whatever we collected ? re-check not efficient 
		return false;
	}
	// note that the empty string is caught above
	// allow for Selenocysteine (U)
	if (fasta.search(/[^gatc\s]/i) != -1) {  
		return false;
	}
	else return true;
}
function convertToProtein(s){
	var frame = 3;
	var tempArray = new Array();
	for(var i = 0; i < s.length; i+= frame){
		var current = s.slice(i, i + frame);
		if(current.length == 3){
			if(current.slice(0,1) == "A"){
				if(current == "AUG") tempArray.push("+");
				else if(current == "AUU" || current == "AUC" || current == "AUA") tempArray.push("I");
				else if(current == "ACU" || current == "ACC" || current == "ACA" || current == "ACG") tempArray.push("T");
				else if(current == "AAU" || current == "AAC") tempArray.push("N");
				else if(current == "AAA" || current == "AAG") tempArray.push("K");
				else if(current == "AGU" || current == "AGC") tempArray.push("S");
				else if(current == "AGA" || current == "AGG") tempArray.push("R");
			}
			else if(current.slice(0,1) == "U"){
				if(current == "UAA" || current == "UAG" || current == "UGA") tempArray.push("-");
				else if(current == "UUU" ||  current == "UUC" ) tempArray.push("F");
				else if(current == "UUA" || current == "UUG") tempArray.push("L");
				else if(current == "UCC" || current == "UCC" || current == "UCA" || current == "UCG") tempArray.push("S");
				else if(current == "UAU" || current == "UAC") tempArray.push("Y");
				else if(current = "UGU" || current == "UGC") tempArray.push("C");
				else if(current == "UGG") tempArray.push("W");
			}
			else if(current.slice(0,1) == "C"){
				if(current == "CCU" || current == "CCC" || current == "CCA" || current == "CCG" ) tempArray.push("P");
				else if(current == "CUU" || current== "CUC" || current == "CUA" || current == "CUG") tempArray.push("L")
				else if(current == "CAU" || current =="CAC") tempArray.push("H");
				else if(current == "CAA" || current == "CAG") tempArray.push("Q");
				else if(current == "CGU" || current== "CGC" || current == "CGA" || current == "CGG") tempArray.push("R");
			}
			else if(current.slice(0, 1) == "G"){
				if(current == "GUU" || current== "GUC" || current == "GUA" || current == "GUG") tempArray.push("V");
				else if(current == "GCU" || current == "GCC" || current == "GCA" || current == "GCG") tempArray.push("A");
				else if(current == "GAU" || current == "GAC") tempArray.push("D");
				else if(current == "GAA" || current == "GAG") tempArray.push("E");
				else if(current == "GGU" || current== "GGC" || current == "GGA" || current == "GGG") tempArray.push("G");
			}
		}
		if(i == s.length - 1 || i == s.length - 2 || i == s.length - 3) {
			return tempArray;
		}
		// console.log("Counter: " + i + " Array: " + tempArray + " length: " + tempArray.length);
	}			
}
function convertToMRA(s){
	var result = "";
	for(i = 0; i < s.length; i++){
		var base = s.slice(i, i+1);
		if(base == "C") result += "C";
		else if(base == "G") result += "G";
		else if(base == "A") result += "A";
		else if(base == "T") result += "U";
	}
	if(result.length == s.length){
		return result;
	}
}
function formatProtein(s, interval){
	console.log(s);
	var proteinDisplay = "";
	for(var i = 0; i < s.length; i++){
		if(i == 0) proteinDisplay +=  i + "<br>"; 
 		else if(i % Math.round(interval / 3) == 0) proteinDisplay += "<br>" + (i * 3) + "<br>";
 		proteinDisplay += "&nbsp";
 		if(s.slice(i, i + 1) == "+") proteinDisplay += "[&nbsp" + s.slice(i, i + 1);
 		else if(s.slice(i, i + 1) == "-") proteinDisplay +=  s.slice(i, i + 1) + "&nbsp]";
 		else proteinDisplay += s.slice(i, i + 1);	
 		proteinDisplay += "&nbsp";
	}
	return proteinDisplay;
}
function convertORF(){
	var coding = document.getElementById("input").value;
	alert(validateFasta(coding));
	if(coding.length == 0 || !/[ACTG]/.test(coding.toUpperCase())){
		alert("Please valid DNA sequence with only ACTG cases");
	}
	else {
		coding = coding.replace(/\s+/g, '').toUpperCase();
		var template = "";
		var display = "";
		var proteinDisplay = "";
		var templateMRA = "";
		var codingMRA = "";
		var firstMRA = "", 
			secondMRA = "",
			thirdMRA = "",
			fourthMRA = "",
			fifthMRA = "",
			sixthMRA = "";
		alert(coding.length);
		for(i = 0; i < coding.length; i++){
			var base = coding.slice(i, i+1);
			if(base == "C") {
				template += "G";
				codingMRA += "C";
			}
			else if(base == "G") {
				template += "C";
				codingMRA += "G";
			}
			else if(base == "A") {
				template += "T";
				codingMRA += "A"; //Convert to MRA
			}
			else if(base == "T") {
				template += "A";
				codingMRA += "U";
			}
		}
		setTimeout(function() {
			if(template.length == coding.length){
				var temp = reverse(template);
				console.log("Coding Strand:  " + coding);
				console.log("Template Strand:  " + template);
				console.log("Coding MRA: " + codingMRA);
				var templateMRA = convertToMRA(temp);
				console.log("TemplateRMA: " + templateMRA);
				firstMRA = codingMRA;
				secondMRA = codingMRA.slice(1);
				thirdMRA = codingMRA.slice(2);
				fourthMRA = templateMRA;
				fifthMRA = templateMRA.slice(1);
				sixthMRA = templateMRA.slice(2);
				document.getElementById("length").innerHTML = "LENGTH: " + coding.length;
				// document.getElementById("mra").innerHTML = "1st MRA: " + firstMRA +
				// 											  "<br>2nd MRA: " + secondMRA +
				// 											  "<br>3rd MRA: " + thirdMRA +
				// 											  "<br>4th MRA: " + fourthMRA +
				// 											  "<br>5th MRA: " + fifthMRA +
				// 											  "<br>6th MRA: " + sixthMRA + "\n";
			 	var firstProtein = convertToProtein(firstMRA).join("");
			 	var secondProtein = convertToProtein(secondMRA).join("");
			 	var thirdProtein = convertToProtein(thirdMRA).join("");
			 	var fourthProtein = convertToProtein(fourthMRA).join("");
			 	var fifthProtein = convertToProtein(fifthMRA).join("");
			 	var sixthProtein = convertToProtein(sixthMRA).join("");
			 	console.log("First Protein: " + firstProtein);
			 	console.log("Second Protein: " + secondProtein);
			 	console.log("Third Protein: " + thirdProtein);
			 	console.log("Fourth Protein: " + fourthProtein);
			 	console.log("Fifth Protein: " + fifthProtein);
			 	console.log("Sixth Protein: " + sixthProtein);
				var interval = 51;
			 	var firstFrame = "",
			 		secondFrame = "",
			 		thirdFrame = "",
			 		fourthFrame = "",
			 		fifthFrame = "",
			 		sixthFrame = "";
				if(firstProtein.length > 0) firstFrame = formatProtein(firstProtein, interval); 
			 	if(secondProtein.length > 0) secondFrame = formatProtein(secondProtein,interval); 
			 	if(thirdProtein.length > 0) thirdFrame = formatProtein(thirdProtein,interval); 
			 	if(fourthProtein.length > 0)fourthFrame = formatProtein(fourthProtein,interval);
			 	if(fifthProtein.length > 0) fifthFrame = formatProtein(fifthProtein,interval);
			 	if(sixthProtein.length > 0) sixthFrame = formatProtein(sixthProtein,interval);
				 document.getElementById("proteinCoding").innerHTML = "<h3>+1:</h3> " + firstFrame +
															  "<h3>+2:</h3> " + secondFrame +
															  "<h3>+3:</h3>" + thirdFrame + "\n";
				document.getElementById("proteinTemplate").innerHTML = "<h3>-1:</h3>" + fourthFrame +
															  "<h3>-2:</h3>" + fifthFrame +
															  "<h3>-3:</h3>" + sixthFrame + "\n";
				for(var i = 0; i < template.length / interval; i++){
					display += i * interval + "<br>"
					display += "5'&nbsp-&nbsp";
					display += coding.slice(i * interval,(i * interval) + interval).replace(/(.{3})/g,"$1 ");
					display += "&nbsp-&nbsp3'<br>";
					display += "3'&nbsp-&nbsp";
					display += template.slice(i * interval, (i * interval)+ interval).replace(/(.{3})/g,"$1 ");
					display += "&nbsp-&nbsp5'<br>"
				}	
				document.getElementById("template").innerHTML = display;


			 	
			 	

	  		}									
		}, 500);
	}		
}		