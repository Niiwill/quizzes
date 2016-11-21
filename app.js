$(document).ready(function() {
$('.rezultat').hide();
// FAKE DATA 
var data={

	"pitanje":[

	{"id":1,"naziv":'KOJI BURGER NAJVISE VOLIS?',"odgovori": [{"id":"1", "ime":"BigMc","tip":"tacno"},{"id":"2", "ime":"CheeseBurger","tip":"netacno"},{"id":"3", "ime":"McTost","tip":"netacno"},{"id":"4", "ime":"McFish","tip":"netacno"}]},
	{"id":2,"naziv":'OMILJENO PICE UZ BURGER?',"odgovori": [{"id":"1", "ime":"Coca-Cola","tip":"tacno"},{"id":"2", "ime":"Sprite","tip":"netacno"},{"id":"3", "ime":"Fanta","tip":"netacno"}]},
	{"id":3,"naziv":'IZABERI POMFRIT?',"odgovori": [{"id":"1", "ime":"Mali","tip":"netacno"},{"id":"2", "ime":"Veliki","tip":"tacno"},{"id":"3", "ime":"Srednji","tip":"netacno"}],}

	]};
     
    // OUTER LOOP THROUGH DATA OBJECT
    for (var i=0 ; i<data.pitanje.length;i++) {

    // APPEND QUESTIONS TO VIEW
    $(".odgovori").append("<div class='row'><div class='col-md-8 col-md-offset-2'><div class='panel  pitanje"+ i +" '><div class='panel-heading blue'><h3 class='panel-title'>"+ data.pitanje[i]['naziv']+ "</h3></div><div class='panel-body'>");

    // INNER LOOP THROUGH DATA OBJECT TO DISPLAY POSSIBLE ANSWERs
    for (var x =0; x<data.pitanje[i]['odgovori'].length;x++) {

    // APPEND TO VIEW POSSIBLE ANSWERS
    $(".pitanje"+ i +"").find(".panel-body").append("<div class='col-xs-6 col-sm-3 col-md-3'><div class='thumbnail'><img src='http://images1.friendseat.com/2011/05/Mcdonalds-Burger.jpg'><div data-pitanjeid="+ data.pitanje[i]['id'] +" data-odgovorid="+data.pitanje[i]['odgovori'][x]['id']+"><h5>"+ data.pitanje[i]['odgovori'][x]['ime'] +"</h5></div></div></div></div>");

    // INNER LOOP END
    };

    // OUTER LOOP END
    };

    // ARRAY OF RESULT FROM USER
    var rezultati=[];

    // NUMBER OR QUESTION THAT USER MUST ANSWER
    var brojpitanja=data.pitanje.length;

    // CLICK EVENT HANDLER FOR ANSWER
  
      $('.thumbnail').click(function() {
        
        $(this).before("<div class='check'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span></div>")
        $('.check').animate({opacity: 1}, 500);
    	$(this).css("color","#4CAF50");

    	$(this).parent().siblings().not(this).animate({opacity: 0.5}, 700);

    	// ID OF QUESTION THAT USER ANSWER
    	var pitanjeId=$(this).children().eq(1).attr('data-pitanjeId');

    	// ID OF ANSWER THAT USER CHOSE
    	var odgovorId=$(this).children().eq(1).attr('data-odgovorId');
         
        

    	

    	// PUSH TO ARRAY 'REZULTATI' ANSWERS FROM USER (TRUE/FALSE) 
    	rezultati.push(data.pitanje[pitanjeId-1]['odgovori'][odgovorId -1 ]['tip']);
       

        // CHECK IF NUMBER OR QUESTION IS EQUAL TO NUMBER OF ANSWERS THAT USER CLICKED
        if(rezultati.length == brojpitanja ){

        	var count = 0;

    		// COUNT HOW MANY POSITIVE (TRUE) ANSWERS USER CHOSE
    		for (var i = 0; i < rezultati.length; i++) {
    			if (rezultati[i] === 'tacno') {
    				count++;
    			}
    		}

            // DISPLAY FINALLY RESULT OF USER POSITIVE ANSWERS EXPRESSED IN PERCENTAGES
            var rs=Math.round(count /  brojpitanja * 100);

           
            if (rs <= 70) { 
            	 rs = "TI SI CHEESBURGER";
            	} else if (rs <= 40) {
            		rs = "TI SI MCTOST";
            	} else {
            		rs = "TI SI BIGMC";
            	}

             console.log(rs);


            $('.rezultat').append(rs);

            // $('.rezultat').append('YOUR SCORE IS '+count /  brojpitanja * 100 + '%');
            
            $('.rezultat').fadeIn();

         // END FOR LOOP 
        };


        // WHEN USER CHOSE ONE ANSWER DISABLE CLICK EVENT ON OTHERS ANSWERS 
        $('div[data-pitanjeid^="'+pitanjeId+'"]').parent().off('click');

    // END OF CLICK EVENT HANDLER
    });
    // END OD JQUERY READY STATMENT
	});