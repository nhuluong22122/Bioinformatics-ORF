function reverse(s){
			var o = '';
		  	for (var i = s.length - 1; i >= 0; i--){
		   	 	o += s[i];
		  	}
		 	return o;
		}
		function convertToProtein(s){
			var frame = 3;
			var tempArray = new Array();
			for(var i = 0; i < s.length; i+= frame){
				var current = s.slice(i, i + frame);
				console.log("current: " + current);
				if(current.length == 3){
					if(current.slice(0,1) == "A"){
						console.log("Found A");
						if(current == "AUG") tempArray.push("Start");
						else if(current == "AUU" || current == "AUC" || current == "AUA") tempArray.push("I");
						else if(current == "ACU" || current == "ACC" || current == "ACA" || current == "ACG") tempArray.push("T");
						else if(current == "AAU" || current == "AAC") tempArray.push("N");
						else if(current == "AAA" || current == "AAG") tempArray.push("K");
						else if(current == "AGU" || current == "AGC") tempArray.push("S");
						else if(current == "AGA" || current == "AGG") tempArray.push("R");
					}
					else if(current.slice(0,1) == "U"){
						console.log("Found U");
						if(current == "UUA" || current == "UAG" || current == "UGA") tempArray.push("Stop");
						else if(current == "UUU" ||  current == "UUC" ) tempArray.push("F");
						else if(current == "UUA" || current == "UUG") tempArray.push("L");
						else if(current == "UCC" || current == "UCC" || current == "UCA" == "UCG") tempArray.push("S");
						else if(current == "UAU" || current == "UAC") tempArray.push("Y");
						else if(current = "UGU" || current == "UGC") tempArray.push("C");
						else if(current == "UGG") tempArray.push("W");
					}
					else if(current.slice(0,1) == "C"){
						console.log("Found C");
						if(current == "CCU" || current == "CCC" || current == "CCA" || current == "CCG" ) tempArray.push("P");
						else if(current == "CUU" || current== "CUC" || current == "CUA" || current == "CUG") tempArray.push("L")
						else if(current == "CAU" || current =="CAC") tempArray.push("H");
						else if(current == "CAA" || current == "CAG") tempArray.push("Q");
						else if(current == "CGU" || current== "CGC" || current == "CGA" || current == "CGG") tempArray.push("R");
					}
					else if(current.slice(0, 1) == "G"){
						console.log("Found G");
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
		function convertORF(){
			var coding = document.getElementById("input").value.trim();
			if(coding.length == 0 || !/[ACTG]/.test(coding.toUpperCase())){
				alert("Please valid DNA sequence with only ACTG cases");
			}
			else {
				coding = coding.replace(/\s+/g, '').toUpperCase();
				var template = "";
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
						document.getElementById("template").innerHTML = template;
						document.getElementById("mra").innerHTML = "1st MRA: " + firstMRA +
																	  "<br>2nd MRA: " + secondMRA +
																	  "<br>3rd MRA: " + thirdMRA +
																	  "<br>4th MRA: " + fourthMRA +
																	  "<br>5th MRA: " + fifthMRA +
																	  "<br>6th MRA: " + sixthMRA + "\n";
					 	var firstProtein = convertToProtein(firstMRA);
					 	var secondProtein = convertToProtein(secondMRA);
					 	var thirdProtein = convertToProtein(thirdMRA);
					 	var fourthProtein = convertToProtein(fourthMRA);
					 	var fifthProtein = convertToProtein(fifthMRA);
					 	var sixthProtein = convertToProtein(sixthMRA);
					 	document.getElementById("protein").innerHTML = "1st Protein: " + firstProtein +
																	  "<br>2nd Protein: " + secondProtein +
																	  "<br>3rd Protein: " + thirdProtein +
																	  "<br>4th Protein: " + fourthProtein +
																	  "<br>5th Protein: " + fifthProtein +
																	  "<br>6th Protein: " + sixthProtein + "\n";


			  	}									
				}, 300);
			}		
		}		