n = 1;
a = setTimeout(function(){
	alert(n);
	n++;
	b = setTimeout(function(){
		alert(n);
		n++;
		c = setTimeout(function(){
			alert(n);
			n++;
			console.log(a);
			console.log(b);
			console.log(c);
		},1000);
	},1000);
},1000);

=>

n = 1;
function a(call){
	let b = setTimeout(function(){
		alert(n);
		n++;
		console.log(b);
		call && call();
	},1000);	
}

a(a(a()));

=>

n = 1;
function a(){
	var p = new Promise(function(resolve, reject){
		setTimeout(function(){
			alert(n);
			n++;
			resolve();
		},5000);	
	})
	return p;
}

function b(){
	setTimeout(function(){
		alert(n);
		n--;
	},2000);	
}

a().then(b);

=>
n = 1;
function a(){
	var p = new Promise(function(resolve, reject){
		var a = setTimeout(function(){
			alert(n);
			n++;
			console.log(a);
			resolve();
		},3000);	
	})
	return p;
}
function b(){
	var p = new Promise(function(resolve, reject){
		var a = setTimeout(function(){
			alert(n);
			n++;
			console.log(a);
			resolve();
		},3000);	
	})
	return p;
}
function c(){
	var p = new Promise(function(resolve, reject){
		var a = setTimeout(function(){
			alert(n);
			n++;
			console.log(a);
			resolve();
		},3000);	
	})
	return p;
}

a().then(b).then(c)


并行
n = 1;
function a(){
	var p = new Promise(function(resolve, reject){
		var a = setTimeout(function(){
			alert(n);
			n++;
			console.log(a);
			resolve();
		},3000);	
	})
	return p;
}
function b(){
	var p = new Promise(function(resolve, reject){
		var a = setTimeout(function(){
			alert(n);
			n++;
			console.log(a);
			resolve();
		},3000);	
	})
	return p;
}
function c(){
	var p = new Promise(function(resolve, reject){
		var a = setTimeout(function(){
			alert(n);
			n++;
			console.log(a);
			resolve();
		},3000);	
	})
	return p;
}

Promise
	.all([a(), b(), c()])
	.then(function(){
		console.log('success')
	})


理解promise逻辑

function a(){
	var b = new Promise(function(resolve, reject){
		setTimeout(function(){
		debugger;
			resolve();
		},1000);
	});
	return b;
}

a() =>
Promise 状态为 prending 等待状态
=> 直到 resolve()执行 => 状态改为resolve之后 => 执行后面的then方法