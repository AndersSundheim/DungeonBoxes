var color = "rgb(255,255,255)";
var boxColor = "rgb(0,0,0)";
genNew(20, 10, 100, 10, 100);
$("#save").click(function() {
    var canvas = document.getElementById("canvas");
    var img = canvas.toDataURL("image/png");
    document.write('<img src="' + img + '"/>');
})
$("#fullscreen").click(function() {
	var elem = document.body; // Make the body go full screen.
	requestFullScreen(elem);
	//alert("Fullscreen Recommended for Wallpapers");
});

$("#cp4").colorpicker({
    format: 'rgb'
}).on('changeColor', function(e) {
    color = e.color.toString("rgb");
    draw();
});

$("#cp5").colorpicker({
    format: 'rgb'
}).on('changeColor', function(e) {
    boxColor = e.color.toString("rgb");
	document.getElementById("slider").children[0].children[0].style.background = incrementColor(splitColor(boxColor));
	document.getElementById("slider").children[0].children[1].style.background = boxColor;
	document.getElementById("slider").children[0].children[2].style.background = decrementColor(splitColor(boxColor));

	//$("#ex4.slider-track-low").css("background",boxColor);
    draw();
});

function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}


$("#hide").click(function() {
    $("#controls").hide();
    document.getElementById("hidden").style.display = "inline";
})
$("#show").click(function() {
    $("#controls").show();
    document.getElementById("hidden").style.display = "none";
})
$('#ex1').slider({});
var boxSlider = $("#ex1").slider();

$("#ex1").on("slide", function(slideEvt) {
    clear();
    redraw(slideEvt.value, widthSlider.slider("getValue")[0], widthSlider.slider("getValue")[1], heightSlider.slider("getValue")[0], heightSlider.slider("getValue")[1]);
});

$("#ex2").slider({});

var widthSlider = $("#ex2").slider();

$("#ex2").on("slide", function(slideEvt) {
    clear();
    redraw(boxSlider.slider("getValue"), slideEvt.value[0], slideEvt.value[1], heightSlider.slider("getValue")[0], heightSlider.slider("getValue")[1]);
});

$("#ex3").slider({});
var heightSlider = $("#ex3").slider();

$("#ex3").on("slide", function(slideEvt) {
    +
    clear();
    redraw(boxSlider.slider("getValue"), widthSlider.slider("getValue")[0], widthSlider.slider("getValue")[1], slideEvt.value[0], slideEvt.value[1]);
});
var upperWindow = 100;
var lowerWindow = 10;
$("#ex4").slider({id:"slider"});
document.getElementById("slider").children[0].children[0].style.background = incrementColor(splitColor(boxColor));
document.getElementById("slider").children[0].children[1].style.background = boxColor;
document.getElementById("slider").children[0].children[2].style.background = decrementColor(splitColor(boxColor));
var gradientSlider = $("#ex4").slider();
$("#ex4").on("slide", function(slideEvt) {
	upperWindow = gradientSlider.slider("getValue")[1];
	lowerWindow = gradientSlider.slider("getValue")[0];
	draw();
    //clear();
    //redraw(boxSlider.slider("getValue"), widthSlider.slider("getValue")[0], widthSlider.slider("getValue")[1], heightSlider.slider("getValue")[0], heightSlider.slider("getValue")[1]);
});

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 82) {
        clear();
        redraw(boxSlider.slider("getValue"), widthSlider.slider("getValue")[0], widthSlider.slider("getValue")[1], heightSlider.slider("getValue")[0], heightSlider.slider("getValue")[1]);
    }
}

function same(x1, y1, x2, y2, edg) {
    for (var i = 1; i < edg.length; i++) {
        if ((x1 == edg[i][0] && y1 == edg[i][1] && x2 == edg[i][2] && y2 == edg[i][3]) || (x2 == edg[i][0] && y2 == edg[i][1] && x1 == edg[i][2] && y1 == edg[i][3])) {
            return true
        }
    }
    return false
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2))
}

function createTree(pointss, edgess) {
    verticess = [pointss[0]];
    treee = [];
    while (verticess.length != pointss.length) {
        ln = 10000;
        temp1 = null;
        temp2 = null;
        for (var i = 0; i < verticess.length; i++) {
            for (var p = 0; p < pointss.length; p++) {
                if (doesexist(verticess, pointss[p]) == false) {
                    if (dist(pointss[p][0], pointss[p][1], verticess[i][0], verticess[i][1]) < ln && same(pointss[p][0], pointss[p][1], verticess[i][0], verticess[i][1], edgess)) {
                        ln = dist(pointss[p][0], pointss[p][1], verticess[i][0], verticess[i][1])
                        temp1 = pointss[p];
                        temp2 = verticess[i];
                    }
                }
            }
        }
        verticess.push(temp1);
        treee.push([temp1[0], temp1[1], temp2[0], temp2[1]]);
    }
    //for i = 1,#tree {
    //--print(tree[i][1],tree[i][2],tree[i][3],tree[i][4])
    //}
    return treee
}




function rando(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gen(widthParam1, widthParam2, heightParam1, heightParam2) {
    var widthSlider = $("#ex2").slider();
    var heightSlider = $("#ex3").slider();
    var x1 = rando(0, window.innerWidth - widthSlider.slider("getValue")[1] - 10);
    var y1 = rando(0, window.innerHeight - heightSlider.slider("getValue")[1] - 10);
    var w1 = rando(widthParam1, widthParam2);
    var h1 = rando(heightParam1, heightParam2);
    var fail = false;
    for (var i = 0; i < r.length; i++) {
        if ((r[i][0] == null) || (testIntersectx(x1, r[i][0], w1, r[i][2]) && testIntersecty(y1, r[i][1], h1, r[i][3]))) {
            ////print('fail')
            fail = true;
        }
    }
    if (fail == true) {
        return null;
    }
    return [x1, y1, w1, h1];
}

function testIntersectx(x1, x2, w1, w2) {
    if ((x1 >= x2 && x1 <= (x2 + w2)) || (x1 + w1 >= x2 && x1 + w1 <= (x2 + w2)) || (x1 <= x2 && x1 + w1 >= x2 + w2)) {
        return true;
    }
    return false;
}

function testIntersecty(y1, y2, h1, h2) {
    if ((y1 >= y2 && y1 <= (y2 + h2)) || (y1 + h1 >= y2 && y1 + h1 <= (y2 + h2)) || (y1 <= y2 && y1 + h1 >= y2 + h2)) {
        return true;
    }
    return false;
}

function doesexist(tab, val) {
    for (var i = 0; i < tab.length; i++) {
        if (val == tab[i]) {
            return true;
        }
    }
    return false;
}
/* function edgeSame(a,b){
  for (var i=0;i<b.length;i++) {
    if (a:same(b[i])) {
      return true;
    }
  }
  return false;
} */
function genNew(bb, wp1, wp2, hp1, hp2) {
    l = [];
    r = [];
    drawtree = false;
    drawd = false;
    start = false;
    points = [];
    edges = [];
    testEdges = [];
    testPts = [];
    var ctr = 0;
    while (ctr != bb) {
        t = gen(wp1, wp2, hp1, hp2);
        if (t != null) {
            r.push([t[0], t[1], t[2], t[3]]);
            ctr++;
        }
    }
    for (var j = 0; j < r.length; j++) {
        points.push([r[j][0] + (r[j][2] / 2), r[j][1] + (r[j][3] / 2)]);
        //table.insert(testPts,{r[j].x+(r[j].w/2),r[j].y+(r[j].h/2)})
    }

    triangles = Delaunay.triangulate(points);
    for (var i = 0; i < triangles.length; i += 3) {
        edges.push([points[triangles[i]][0], points[triangles[i]][1], points[triangles[i + 1]][0], points[triangles[i + 1]][1]]);
        edges.push([points[triangles[i + 1]][0], points[triangles[i + 1]][1], points[triangles[i + 2]][0], points[triangles[i + 2]][1]]);
        edges.push([points[triangles[i + 2]][0], points[triangles[i + 2]][1], points[triangles[i]][0], points[triangles[i]][1]]);
        ////table.insert(testEdges,{triangle.p1.x,triangle.p1.y,triangle.p2.x,triangle.p2.y})
        ////table.insert(testEdges,{triangle.p2.x,triangle.p2.y,triangle.p3.x,triangle.p3.y})
        ////table.insert(testEdges,{triangle.p3.x,triangle.p3.y,triangle.p1.x,triangle.p1.y})
    }
    tree = [];
    addtree = [];
    for (var i = 0; i < .08 * edges.length; i++) {
        //addtree.push(edges[rando((1,edges.length)]));
    }
    tree = createTree(points, edges);

    /*vertices = [points[0]];
    while (vertices.length != points.length) {
      ln = 10000;
      temp1 = null;
      temp2 = null;
      for (var i = 0; i<vertices.length;i++) {
        for(var p = 0; p<points.length;p++){
          if (doesexist(vertices,points[p])==false) {
              if points[p]:dist(vertices[i])<ln and edgeSame(Delaunay.Edge(points[p],vertices[i]),edges) {
                ln = points[p]:dist(vertices[i])
                temp1 = points[p]
                temp2 = vertices[i]
              }
            }
          }
        }
        table.insert(vertices,temp1)
        table.insert(tree,Delaunay.Edge(temp1,temp2))
      }*/
    /*for i = 1, #tree {
      //console.log(tree[i].p1.x,tree[i].p1.y,tree[i].p2.x,tree[i].p2.y)
    }*/
    //print("////////////////////////")
    ////mst.tree(testPts,testEdges)
    /*for (i = 1, .01*#edges) {
      f = math.rando(1,edges.length);
      if edgeSame(edges[f],tree) == false {
        table.insert(addtree,edges[f]);
      }
	}*/
    temp = r;
    draw();
}

function clear() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function redraw(numBoxes, wp1, wp2, hp1, hp2) {
    genNew(numBoxes, wp1, wp2, hp1, hp2);
}
function splitColor(s){
	splitt = s.split(",");
	splitt[0] = splitt[0].substring(4);
	splitt[2] = splitt[2].substring(0,splitt[2].length-1);
	//console.log(splitt);
	return splitt;
}
function incrementColor(rgb){
	//console.log(rgb);
	//console.log("rgb(" + (parseInt(rgb[0])+50) + "," +  (parseInt(rgb[1])+50) + "," +(parseInt(rgb[2])+50) + ")");
	return "rgb(" + (parseInt(rgb[0])+50) + "," +  (parseInt(rgb[1])+50) + "," +(parseInt(rgb[2])+50) + ")";
}
function decrementColor(rgb){
	//console.log(rgb);
	//console.log("rgb(" + (parseInt(rgb[0])+50) + "," +  (parseInt(rgb[1])+50) + "," +(parseInt(rgb[2])+50) + ")");
	return "rgb(" + (parseInt(rgb[0])-50) + "," +  (parseInt(rgb[1])-50) + "," +(parseInt(rgb[2])-50) + ")";
}
function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = color;
    console.log(color);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = boxColor;
	splitColor(boxColor);
    /* for i=1,#l {
      love.graphics.setColor(255,255,255,255)
      ////love.graphics.line(l[i].x1,l[i].y1,l[i].x2,l[i].y2)
    } */

    for (var i = 0; i < tree.length; i++) {
        ctx.beginPath();
        ctx.moveTo(tree[i][2], tree[i][1]);
        ctx.lineTo(tree[i][2], tree[i][3]);
        ctx.stroke();
        ctx.moveTo(tree[i][0], tree[i][1]);
        ctx.lineTo(tree[i][2], tree[i][1]);
        ctx.stroke();
        /* love.graphics.line(tree[i].p2.x,tree[i].p1.y,tree[i].p2.x,tree[i].p2.y)
        love.graphics.line(tree[i].p1.x,tree[i].p1.y,tree[i].p2.x,tree[i].p1.y) */
        //love.graphics.rectangle("line",tree[i].p1.x,tree[i].p1.y,tree[i].p2.x-tree[i].p1.x,tree[i].p2.y-tree[i].p1.y)
    }
    /*
    for i=1,#addtree {
      love.graphics.line(addtree[i].p2.x,addtree[i].p1.y,addtree[i].p2.x,addtree[i].p2.y)
      love.graphics.line(addtree[i].p1.x,addtree[i].p1.y,addtree[i].p2.x,addtree[i].p1.y)
      //love.graphics.rectangle("line",tree[i].p1.x,tree[i].p1.y,tree[i].p2.x-tree[i].p1.x,tree[i].p2.y-tree[i].p1.y)
    } */
    for (var j = 0; j < r.length; j++) {
		ctx.fillStyle = boxColor;
        if (r[j][0] != null) {
			if((r[j][2]+r[j][3])/2<lowerWindow){
				ctx.fillStyle = incrementColor(splitColor(boxColor));
			}else if ((r[j][2]+r[j][3]/2)>upperWindow){
				ctx.fillStyle = decrementColor(splitColor(boxColor));
			}
            /* if (r[j][2]*r[j][3] > 4500) {
        love.graphics.setColor(200,200,200,255)
		}else if r[j][2]*r[j][3] > 3000 {
        love.graphics.setColor(175,175,175,255)
		}else if r[j][2]*r[j][3] > 2000 {
        love.graphics.setColor(150,150,150,255)
		}else if r[j][2]*r[j][3] > 1000 {
        love.graphics.setColor(125,125,125,255);
		}else{
        love.graphics.setColor(100,100,100,255);
		} */
            ctx.fillRect(r[j][0], r[j][1], r[j][2], r[j][3]);
        }
    }


    /*for i, triangle in ipairs(triangles) {
      love.graphics.setColor(20,255,0,100)
      if drawd == true {
        love.graphics.polygon("line",triangle.p1.x,triangle.p1.y,triangle.p2.x,triangle.p2.y,triangle.p3.x,triangle.p3.y)
      }
    }
    */

    /*for i=1,#tree {
      love.graphics.setColor(255,0,0,100)
      if drawtree == true {
        love.graphics.line(tree[i].p1.x,tree[i].p1.y,tree[i].p2.x,tree[i].p2.y)
      }
    }*/



    //for i=1,#addtree {
    //love.graphics.setColor(0,255,0,100)
    //love.graphics.line(addtree[i].p1.x,addtree[i].p1.y,addtree[i].p2.x,addtree[i].p2.y)
    //}
}