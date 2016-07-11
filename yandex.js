
/**
 ** @param {Array} data – массив CSS классов
 **/   
module.exports = function(data) {
    /*
     Индексируем массив классов.
     Предполагается, что количество повторов не превосходит 32-битное целое
     */
	var obj={};
	for(var i in data){
		obj[data[i]]=(obj[data[i]]|0)+1;
	}

    /*
        Сортировка по убыванию частоты использования классов
     */
	var arr=[];
	for(var i in obj){
		  arr.push({key:i,cnt:obj[i]});
	}
	arr=arr.sort(function(a,b){
		return b.cnt-a.cnt;
	});

	/*
	    Минификация
	*/
	var f=function(code,cs){
		var i=0;
		var c=code.split('');
		if(typeof cs=="undefined"){
			cs="abcdefghijklmnopqrstuvwxyz";
		}
		var pos;
		for(i=0;i<c.length;i++){
			pos=cs.indexOf(c[i]);
			if(pos<cs.length-1){
				c[i]=cs[pos+1];
				return c.join('');
			}
			c[i]=cs[0];

		}
		c.push("a");
		return c.join('');
		
	}	
	var l=arr.length;
	var code="";
	for(var i=0,j=0;i<l;i++){
		code=f(code);
		obj[arr[i].key]=code;
		
	}

    return obj;
};

