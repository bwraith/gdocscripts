function bwhlkp(x, xrange, inrowtxt, outrowtxt, interpmethod)
{
rowmax = xrange.length;
columnmax = xrange[0].length;
inrowidx = 0;
outrowidx = 0;
for (i = 0; i < rowmax; i++)
  {
  if (inrowtxt == xrange[i][0])
    {
      inrowidx=i;
    }
  if (outrowtxt == xrange[i][0])
    {
      outrowidx=i;
    }
  }
foundidx = 1;
while ((x >= xrange[inrowidx][foundidx])&&(foundidx < columnmax-1)) 
{
  foundidx++;
}
foundidx--;
x0 = xrange[inrowidx][foundidx];
x1 = xrange[inrowidx][foundidx + 1];
y0 = xrange[outrowidx][foundidx];
y1 = xrange[outrowidx][foundidx + 1];
if (x >= x1) 
{
  y = y1;
}
else if (x<=x0)
{
  y = y0;
}
else
{
  a0 = (x1 - x) / (x1 - x0);
  a1 = (x - x0) / (x1 - x0);
  y = a0 * y0 + a1 * y1;
}
return y;
}
  
function bwvlkp(x, yrange, incoltxt, outcoltxt, interpmethod)
{
rowmax = yrange.length;
columnmax = yrange[0].length;
incolidx = 0;
outcolidx = 0;
for (i = 0; i < columnmax; i++)
  {
  if (incoltxt == yrange[0][i])
    {
      incolidx=i;
    }
  if (outcoltxt == yrange[0][i])
    {
      outcolidx=i;
    }
  }
foundidx = 1;
while ((x >= yrange[foundidx][incolidx])&&(foundidx < rowmax-1)) 
{
  foundidx++;
}
foundidx--;
x0 = yrange[foundidx][incolidx];
x1 = yrange[foundidx + 1][incolidx];
y0 = yrange[foundidx][outcolidx];
y1 = yrange[foundidx + 1][outcolidx];
if (interpmethod == 4)
{
a0 = (x1 - x) / (x1 - x0);
a1 = (x - x0) / (x1 - x0);
y = a0 * y0 + a1 * y1;
}
if (interpmethod == 1)
{
  if (x >= x1)
  {
    y = y1;
  }
  else 
  {
  y = y0;
  }
}
return y;
}

function bw3lkp(y,x,z)
{
interpidx = arguments.length-1;
numareas = arguments.length-4;
zmax = numareas;
var ztbl = new Array(zmax);
var zvals = new Array(zmax);
interpmethod = arguments[interpidx];
for (i=0;i<numareas;i++)
{
  ztbl[i]=arguments[i+3];
  zvals[i]=ztbl[i][0][0];
}
xmax = ztbl[0].length;
ymax = ztbl[0][0].length;
var xvals = new Array(xmax);
var yvals = new Array(ymax);
for (i=0;i<xmax;i++)
{
  xvals[i] = ztbl[0][i][0];
}
for (i=0;i<ymax;i++)
{
  yvals[i] = ztbl[0][0][i];
}
xidx = 1;
while ((x >= xvals[xidx])&&(xidx < xmax-1)) xidx++;
yidx = 1;
while ((y >= yvals[yidx])&&(yidx < ymax-1)) yidx++;
zidx = 1;
while ((z >= zvals[zidx])&&(zidx < zmax-1)) zidx++;
xidx1 = xidx;
yidx1 = yidx;
zidx1 = zidx;
xidx0 = xidx - 1;
yidx0 = yidx - 1;
zidx0 = zidx - 1;
x1 = xvals[xidx1];
x0 = xvals[xidx0];
y1 = yvals[yidx1];
y0 = yvals[yidx0];
z1 = zvals[zidx1];
z0 = zvals[zidx0];
ax = (x1 - x) / (x1 - x0);
ay = (y1 - y) / (y1 - y0);
az = (z1 - z) / (z1 - z0);
w000 = ztbl[zidx0][xidx0][yidx0];
w001 = ztbl[zidx1][xidx0][yidx0];
w010 = ztbl[zidx0][xidx0][yidx1];
w011 = ztbl[zidx1][xidx0][yidx1];
w100 = ztbl[zidx0][xidx1][yidx0];
w101 = ztbl[zidx1][xidx1][yidx0];
w110 = ztbl[zidx0][xidx1][yidx1];
w111 = ztbl[zidx1][xidx1][yidx1];
wx00 = ax * w000 + (1 - ax) * w100;
wx01 = ax * w001 + (1 - ax) * w101;
wx10 = ax * w010 + (1 - ax) * w110;
wx11 = ax * w011 + (1 - ax) * w111;
wxy0 = ay * wx00 + (1 - ay) * wx10;
wxy1 = ay * wx01 + (1 - ay) * wx11;
wxyz = az * wxy0 + (1 - az) * wxy1;
return wxyz;
}

function setmaintblrow(col1,col2time,col3,fuel,ovenopen,Te,tinc,tcum,tinfest,wuf,caest,tappest,thest,tinftabest,thest0)
{
  var col1idx=0;
  var col2idx=1;
  var col3idx=2;
  var fuelidx=3;
  var ovenopenidx=4;
  var teidx=5;
  var tincidx=6;
  var tcumidx=7;
  var tinfestidx=8;
  var wufidx=9;
  var caestidx=10;
  var tappestidx=11;
  var thestidx=12;
  var tinftabestidx=13;
  var thest0idx=14;
  var maintblrow = new Array(15);
  maintblrow[col1idx] = col1;
  maintblrow[col2idx] = new Date(col2time);
  maintblrow[col3idx] = col3;
  maintblrow[fuelidx] = fuel;
  maintblrow[ovenopenidx] = ovenopen;
  maintblrow[teidx] = Te;
  maintblrow[tincidx] = tinc;
  maintblrow[tcumidx] = tcum;
  maintblrow[tinfestidx] = tinfest;
  maintblrow[wufidx] = wuf;
  maintblrow[caestidx] = caest;
  maintblrow[tappestidx] = tappest;
  maintblrow[thestidx] = thest;
  maintblrow[tinftabestidx] = tinftabest;
  maintblrow[thest0idx] = thest0;
  return maintblrow;
}  
 
function maintable(start_time,T0,oven_settings,fuel_tinf,losstbl1,losstbl2,losstbl3,losstbl4)
{
  var maintblsize = 266;
  var maintblrows = 15;
  var maintbl = new Array(maintblsize);
  var col1idx=0;
  var col2idx=1;
  var col3idx=2;
  var fuelidx=3;
  var ovenopenidx=4;
  var teidx=5;
  var tincidx=6;
  var tcumidx=7;
  var tinfestidx=8;
  var wufidx=9;
  var caestidx=10;
  var tappestidx=11;
  var thestidx=12;
  var tinftabestidx=13;
  var thest0idx=14;
 
  var tcum = 0;
  var col2minutes;
  var tcumlast = tcum;
  var col1 = (tcum-bwvlkp(tcum,oven_settings,"tcum","tcum",1))/60;
  var col2 = new Date();
  var col2time = start_time.getTime();
  col2.setTime(col2time);
  var col3 = tcum/60;
  var fuel = bwvlkp(tcum,oven_settings,"tcum","Fuel",1);
  var ovenopen = bwvlkp(tcum,oven_settings,"tcum","Open",1);
  var Te = bwvlkp(tcum,oven_settings,"tcum","Te",1);
  var tinc = (0.25 * 60);
  var tinftabest = bwhlkp(fuel,fuel_tinf,"Uf","Tinf",4);
  var thest0 = T0;
  var tappest = thest0;
  var caest = bw3lkp(fuel,tappest,ovenopen,losstbl1,losstbl2,losstbl3,losstbl4,4);
  var wuf = bwhlkp(fuel,fuel_tinf,"Uf","Wuf",4);
  var tinfest;
  if (tinc>(0.5/caest)) {
    tinfest = tinftabest; }
  else { tinfest = wuf/caest; }
  var thest = tinfest + (thest0-Te-tinfest)*Math.exp(-caest*tinc)+Te;
  maintbl[0] = new Array();
  maintbl[0] = setmaintblrow(col1,col2time,col3,fuel,ovenopen,Te,tinc,tcum,tinfest,wuf,caest,tappest,thest,tinftabest,thest0);
  var rowidx;
  for (rowidx=1;rowidx<maintblsize;rowidx++)
  {
  tcum = tcum + (0.25)*60;
  col1 = (tcum-bwvlkp(tcum,oven_settings,"tcum","tcum",1))/60;
  col2time = col2time + 15*60*1000;
  col2.setTime(col2time);
  col3 = tcum/60.0;
  fuel = bwvlkp(tcum,oven_settings,"tcum","Fuel",1);
  ovenopen = bwvlkp(tcum,oven_settings,"tcum","Open",1);
  Te = bwvlkp(tcum,oven_settings,"tcum","Te",1);
  tinc = tcum-tcumlast;
  tcumlast = tcum;
  tinftabest = bwhlkp(fuel,fuel_tinf,"Uf","Tinf",4);
  thest0 = thest;
  tappest = (tinftabest+(thest0-Te-tinftabest)*Math.exp(-caest*tinc)+Te+thest0)/2.0;
  caest = bw3lkp(fuel,tappest,ovenopen,losstbl1,losstbl2,losstbl3,losstbl4,4);
  wuf = bwhlkp(fuel,fuel_tinf,"Uf","Wuf",4);
  if (tinc>(0.5/caest)) {
    tinfest = tinftabest; }
  else { tinfest = wuf/caest; }
  thest = tinfest+(thest0-Te-tinfest)*Math.exp(-caest*tinc)+Te;
  maintbl[rowidx] = new Array();
  maintbl[rowidx] = setmaintblrow(col1,col2time,col3,fuel,ovenopen,Te,tinc,tcum,tinfest,wuf,caest,tappest,thest,tinftabest,thest0);
  }      
  return maintbl;
}
  
function thesttbl(tcumend,bigtbl)
{
  var outtblrows = tcumend.length;
  var outtbl = Array(outtblrows);
  var rowidx = 0;
  for (rowidx=0;rowidx<outtblrows;rowidx++)
  {
     outtbl[rowidx] = new Array(1);  
     outtbl[rowidx][0] = bwvlkp(tcumend[rowidx],bigtbl,"tcum","Thest0",4);
  }
return outtbl;
}

function bwhlkptbl(xtbl,xrange,inrowtxt,outrowtxt,interpmethod)
{
  var outtblrows = xtbl.length;
  var outtbl = Array(outtblrows);
  for (rowidx=0;rowidx<outtblrows;rowidx++)
  {
     outtbl[rowidx] = new Array(1);  
     outtbl[rowidx][0] = bwhlkp(xtbl[rowidx],xrange,inrowtxt,outrowtxt,interpmethod);
  }
return outtbl;
}

function bw3lkptbl(yintbl,xintbl,zintbl)
{
outtblrows = yintbl.length;
var outtbl = Array(outtblrows);
interpidx = arguments.length-1;
numareas = arguments.length-4;
zmax = numareas;
var ztbl = new Array(zmax);
var zvals = new Array(zmax);
interpmethod = arguments[interpidx];
for (i=0;i<numareas;i++)
{
  ztbl[i]=arguments[i+3];
  zvals[i]=ztbl[i][0][0];
}
xmax = ztbl[0].length;
ymax = ztbl[0][0].length;
var xvals = new Array(xmax);
var yvals = new Array(ymax);
for (i=0;i<xmax;i++)
{
  xvals[i] = ztbl[0][i][0];
}
for (i=0;i<ymax;i++)
{
  yvals[i] = ztbl[0][0][i];
}
for (rowidx=0;rowidx<outtblrows;rowidx++)
{
x = xintbl[rowidx];
y = yintbl[rowidx];
z = zintbl[rowidx];
xidx = 1;
while ((x >= xvals[xidx])&&(xidx < xmax-1)) xidx++;
yidx = 1;
while ((y >= yvals[yidx])&&(yidx < ymax-1)) yidx++;
zidx = 1;
while ((z >= zvals[zidx])&&(zidx < zmax-1)) zidx++;
xidx1 = xidx;
yidx1 = yidx;
zidx1 = zidx;
xidx0 = xidx - 1;
yidx0 = yidx - 1;
zidx0 = zidx - 1;
x1 = xvals[xidx1];
x0 = xvals[xidx0];
y1 = yvals[yidx1];
y0 = yvals[yidx0];
z1 = zvals[zidx1];
z0 = zvals[zidx0];
ax = (x1 - x) / (x1 - x0);
ay = (y1 - y) / (y1 - y0);
az = (z1 - z) / (z1 - z0);
w000 = ztbl[zidx0][xidx0][yidx0];
w001 = ztbl[zidx1][xidx0][yidx0];
w010 = ztbl[zidx0][xidx0][yidx1];
w011 = ztbl[zidx1][xidx0][yidx1];
w100 = ztbl[zidx0][xidx1][yidx0];
w101 = ztbl[zidx1][xidx1][yidx0];
w110 = ztbl[zidx0][xidx1][yidx1];
w111 = ztbl[zidx1][xidx1][yidx1];
wx00 = ax * w000 + (1 - ax) * w100;
wx01 = ax * w001 + (1 - ax) * w101;
wx10 = ax * w010 + (1 - ax) * w110;
wx11 = ax * w011 + (1 - ax) * w111;
wxy0 = ay * wx00 + (1 - ay) * wx10;
wxy1 = ay * wx01 + (1 - ay) * wx11;
wxyz = az * wxy0 + (1 - az) * wxy1;
outtbl[rowidx] = new Array(1);  
outtbl[rowidx][0] = wxyz;
}
return outtbl;
}

