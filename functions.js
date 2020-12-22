
"use strict";

const can = document.getElementById('can');
const con = can.getContext("2d");

can.width = 800;
can.height = 640;

function rand(min, max)
{
	return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}

function fillR( arr, color = "#000" )
{
	con.fillStyle = color;
	con.fillRect(arr.x, arr.y, 4, 4);
}

function drawCurve(start, end, cp, stats = false)
{
	if (stats)
	{
		con.moveTo(start.x, start.y);
	}
	con.quadraticCurveTo(cp.x, cp.y, end.x, end.y)
}
function drawCurve2(start, end, cp1, cp2, stats = false)
{
	if (stats)
	{
		con.moveTo(start.x, start.y);
	}
	con.bezierCurveTo(
		cp1.x, cp1.y,
		cp2.x, cp2.y,
		end.x, end.y);
}

function generateCoordinate()
{
}

function sp( start, end, value)
{
	return Math.floor(Math.abs(end - start) * value);
}
