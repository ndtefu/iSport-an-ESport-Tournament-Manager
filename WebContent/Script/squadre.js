function menu(k){
	
$("#"+k).toggleClass("active");
	
}


function tendina(k){
	var selected=$('.selected.'+event.target.name);
	var optionsContainer = $("#"+event.target.name);
	selected.text($("label[for='"+k+"']").html());
    optionsContainer.toggleClass("active");
}


function add(){

	if($("input[type=radio][name=sel]:checked").attr("id")==="nuova")
		window.location.replace('FormInserimentoGiocatori.jsp');
	else{
		var squadre=$("#listaSquadre");	//div che contiene le img delle squadre
		var check=$(".squadraSelezionata:checked").val();	//nome della squadra scelta
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {

			if (xhr.status == 200 && xhr.readyState == 4) {
			
			let data = JSON.parse(xhr.responseText);
			console.log(data);
			squadre.append('<div class='+check+'><img  onclick="eliminaSquadra(\''+check+'\')" src='+data['0']+'></div>');
				}
			}
			xhr.open('GET', '../SquadreControl?action=getImgSquadra&squadraScelta='+check, true);
			xhr.send();
				
		}
}
	function eliminaSquadra(i){
		var tmp=$("."+i);
		tmp.remove();	
	}

function elimina(i){
	var toErase= "squadra"+i;
	
	var tmp=$('#'+toErase);
	tmp.empty();
	
	
}




function cambiaTipo(){
	var iva=$("#iva").val();
	if(event.target.id==="esistente"){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {

		if (xhr.status == 200 && xhr.readyState == 4) {

			let data = JSON.parse(xhr.responseText);
			console.log(data);
			var write=$('.squadreEsistenti');
			write.append('<label for="squadreEsistenti">Squadre già presenti nel database</label> <div class="container"> <div class="select-box">'+
					'<div class="options-container" id="squadreEsistenti">'+
					'</div><div class="selected squadreEsistenti" onclick="menu(\'squadreEsistenti\')">'+
		             ' Seleziona una squadra</div></div></div>');
			
			
			for (var i = 0; i < data.length; i++) {
				var nome = data[i].nome.replace(/\s/g, '');
				$('#squadreEsistenti').append('<div class="option"><label for="'+nome+'">'+data[i].nome+'</label><input required name="squadreEsistenti" onclick="tendina(\''+nome+'\')" type="radio" class="radio squadraSelezionata" id="'+nome+'" value="'+data[i].nome+'"> </div>');	
			}
			
			$('#aggiungi').attr("value","Aggiungi una squadra esistente");
			
		}
			
	  }	
		if(iva=="           "){
		xhr.open('GET', '../SquadreControl?action=getSquadreNoIva', true);
		xhr.send();
		}else{
			xhr.open('GET', '../SquadreControl?action=getSquadre', true);
			xhr.send();
			
		}
	} else{
		
		$('.squadreEsistenti').empty();
		$('#aggiungi').attr("value","Aggiungi una squadra esistente");
	}
}

