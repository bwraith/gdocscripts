function testspreadsheet()
{
 // var ss = SpreadsheetApp.getActiveSpreadsheet();
 // var myparam = ss.getSheetByName("model").getRange("AC17").getValue();
  myparam = 1.001;
  return myparam;
}

function test2()
{
return testspreadsheet();
}

function test3()
{
  test3_val() = test2();
  return test2();
}

function minimum(x, y)
{
  if (x > y) 
  {
    return y;
  } else return x;
}

function glutenrot(rotfactor)
{
maxrot = 0.7;
return 1 - Math.pow((rotfactor / maxrot),1.75);
}

function uy(T)
{
  ay = 0.0124;
  by = 2.981;
  cy = -0.3355;
  T0 = 36;
  x = T0 - T;
  uyval = ay * Math.pow(x,by) * Math.exp(cy * x);
  return uyval;
}

function ph_slowdown(rotfactor)
{
maxrot = 0.7;
ph_slowdown_val = 1 - Math.pow((rotfactor / maxrot),2);
return ph_slowdown_val;
}

function u_glut(stiffness)
{
xc = 1;
by = 7;
x0 = 2.0;
cy = -by / (x0 - xc);
ay = Math.exp(by);
ay = Math.pow((x0 - xc),(-by)) * Math.exp(-cy * (x0 - xc));
x = x0 - stiffness;
u_glut_val = ay * Math.pow(x,by) * Math.exp(cy * x);
return u_glut_val;
}

function gluten_quality(h, xi, rotfactor)
{
glut_q_factor = testspreadsheet();
stiffness = stiff_xi(xi) * stiff_h(h) * glutenrot(rotfactor) * glut_q_factor;
gluten_quality_val = u_glut(stiffness);
return gluten_quality_val;
}

function ulb(T)
{
alb = 0.095;
blb = 1.75;
clb = -0.2045;
Tlb0 = 41;
x = Tlb0 - T;
ulbval = alb * Math.pow(x,blb) * Math.exp(clb * x);
return ulbval;
}

function uh(h, rotfactor)
{
umin = 0.9;
hmax = 0.6;
th = 0.3;
uh_val = umin + (1 - umin) * (1 - Math.exp((hmax - h) / th));
return uh_val;
}

function stiff_h(h)
{
umin = 0.75;
hmax = 0.56;
th = 0.07;
hc = 1.2;
d = 13;
u0 = 1.3;
stiff_h_val = u0 * (umin + (1 - umin) * Math.exp((hmax - h) / th)) * (1 - Math.pow((h / hc),d));
return stiff_h_val;
}

function ui(xi)
{
ximax = 0.07;
ai = 1.4;
ui0 = 1;
ui_val = ui0 * (1 - Math.pow((xi / ximax),ai));
return ui_val;
}

function stiff_xi(xi)
{
umin = 0.85;
ximin = 0;
txi = 0.01;
u0 = 1.05;
stiff_xi_val = u0 * (umin + (1 - umin) * (1 - Math.exp((ximin - xi) / txi)));
return stiff_xi_val;
}

function uall(T, h, xi, u0, rotfactor)
{
uall_val = u0 * uy(T) * uh(h, rotfactor) * ui(xi) * ph_slowdown(rotfactor) * gluten_quality(h, xi, rotfactor);
return uall_val;
}

function uall_lb(T, h, xi, ulb0, rotfactor)
{
uall_lb_val = ulb0 * ulb(T) * uh(h, rotfactor) * ui(xi) * ph_slowdown(rotfactor) * gluten_quality(h, xi, rotfactor);
return uall_lb_val;
}

function uall_ave(T, h, xi, u0, rotfactor)
{
uall_ave_val = ((uall(T, h, xi, u0, rotfactor) + uall_lb(T, h, xi, u0, rotfactor)) / 2);
return uall_ave_val;
}

function urise_ave(T, h, xi, u0, rotfactor)
{
utempave = (ulb(T) + uy(T)) / 2;
retval = u0 * utempave * uh(h, rotfactor) * ui(xi) * ph_slowdown(rotfactor);
return retval;
}

function urise_y(T, h, xi, u0, rotfactor)
{
urise_y_val = u0 * uy(T) * uh(h, rotfactor) * ui(xi) * ph_slowdown(rotfactor);
return urise_y_val;
}

function urise_lb(T, h, xi, u0, rotfactor)
{
urise_lb_val = u0 * ulb(T) * uh(h, rotfactor) * ui(xi) * ph_slowdown(rotfactor);
return urise_lb_val;
}

function gluten_quality_matrix(xrange, yrange, rotfactor)
{
  var maxrows = Number(xrange.length);
  maxcols = yrange[0].length;
  var matvals = new Array(maxrows);
  var rowidx,colidx;
  for (rowidx = 0;rowidx < maxrows;rowidx++)
  {
      matvals[rowidx] = new Array(maxcols);
      for (colidx = 0;colidx < maxcols;colidx++)
      {     
        matvals[rowidx][colidx] = gluten_quality(xrange[rowidx][0],yrange[0][colidx],rotfactor);
      }
  }
return matvals;
}
  
function stifftbl(inrange)
{
  var maxrows = Number(inrange.length);
  var maxcols = 5;
  var glutenrot_idx = 4;
  var stiff_xi_idx = 3;
  var stiff_h_idx = 2;
  var u_glut_idx = 1;
  var stiffness_idx = 0;
  var h_idx = 0;
  var xi_idx = 1;
  var rotfactor_idx = 2;
  var outrange = new Array(maxrows);
  var rowidx,colidx;
  for (rowidx = 0;rowidx < maxrows;rowidx++)
  {
    outrange[rowidx] = new Array(maxcols);
    outrange[rowidx][glutenrot_idx] = glutenrot(inrange[rowidx][rotfactor_idx]);
    outrange[rowidx][stiff_xi_idx] = stiff_xi(inrange[rowidx][xi_idx]); 
    outrange[rowidx][stiff_h_idx] = stiff_h(inrange[rowidx][h_idx]);
    outrange[rowidx][stiffness_idx] = outrange[rowidx][glutenrot_idx]*outrange[rowidx][stiff_xi_idx]*outrange[rowidx][stiff_h_idx];
    outrange[rowidx][u_glut_idx] = u_glut(outrange[rowidx][stiffness_idx]);
  }
  return outrange;
}
    
function uhtbl(intbl,rotfactor)
{  
  maxrows = Number(intbl.length);
  maxcols = 1;
  var outrange = new Array(maxrows);
  for (rowidx = 0;rowidx < maxrows;rowidx++)
  {
    outrange[rowidx] = new Array(maxcols);
    outrange[rowidx][0] = uh(intbl[rowidx][0],rotfactor);
  }
return outrange;
}
  
function uitbl(intbl)
{  
  maxrows = Number(intbl.length);
  maxcols = 1;
  var outrange = new Array(maxrows);
  for (rowidx = 0;rowidx < maxrows;rowidx++)
  {
    outrange[rowidx] = new Array(maxcols);
    outrange[rowidx][0] = ui(intbl[rowidx][0]);
  }
return outrange;
}
  
function glutenrottbl(intbl)
{  
  maxrows = Number(intbl.length);
  maxcols = 1;
  var outrange = new Array(maxrows);
  for (rowidx = 0;rowidx < maxrows;rowidx++)
  {
    outrange[rowidx] = new Array(maxcols);
    outrange[rowidx][0] = glutenrot(intbl[rowidx][0]);
  }
return outrange;
}
  
function stiff_h_tbl(intbl)
{  
  maxrows = Number(intbl.length);
  maxcols = 1;
  var outrange = new Array(maxrows);
  for (rowidx = 0;rowidx < maxrows;rowidx++)
  {
    outrange[rowidx] = new Array(maxcols);
    outrange[rowidx][0] = stiff_h(intbl[rowidx][0]);
  }
return outrange;
}
  
function stiff_xi_tbl(intbl)
{  
  maxrows = Number(intbl.length);
  maxcols = 1;
  var outrange = new Array(maxrows);
  for (rowidx = 0;rowidx < maxrows;rowidx++)
  {
    outrange[rowidx] = new Array(maxcols);
    outrange[rowidx][0] = stiff_xi(intbl[rowidx][0]);
  }
return outrange;
}
  
function ph_slowdown_tbl(intbl)
{  
  maxrows = Number(intbl.length);
  maxcols = 1;
  var outrange = new Array(maxrows);
  for (rowidx = 0;rowidx < maxrows;rowidx++)
  {
    outrange[rowidx] = new Array(maxcols);
    outrange[rowidx][0] = ph_slowdown(intbl[rowidx][0]);
  }
return outrange;
}
  
function u_glut_tbl(intbl)
{  
  maxrows = Number(intbl.length);
  maxcols = 1;
  var outrange = new Array(maxrows);
  for (rowidx = 0;rowidx < maxrows;rowidx++)
  {
    outrange[rowidx] = new Array(maxcols);
    outrange[rowidx][0] = u_glut(intbl[rowidx][0]);
  }
return outrange;
}
  
function sdrisetbl(inoctbl,bulkfactor,prooffactor,startpot,T,h,xi,speed,rotfactor)
{
  var maxcols = inoctbl[0].length;
  var outrange = new Array(4);
  var doubling_time_idx = 0;
  var bulk_ferm_time_idx = 1;
  var proof_time_idx = 2;
  var mix_to_bake_time_idx = 3;
  for (i = 0;i < 4;i++)
  {
    outrange[i] = new Array(maxcols);
  }   
  for (j = 0;j < maxcols;j++)
  {
    inoc = inoctbl[0][j];
    outrange[doubling_time_idx][j] = Math.log(1/(inoc*startpot))/uall_ave(T,h,xi,speed,inoc*rotfactor);
    outrange[bulk_ferm_time_idx][j] = Math.log(bulkfactor/(inoc*startpot))/urise_ave(T,h,xi,speed,inoc*rotfactor);
    outrange[proof_time_idx][j] = Math.log(prooffactor/bulkfactor)/urise_ave(T,h,xi,speed,inoc*rotfactor);
    outrange[mix_to_bake_time_idx][j] = outrange[bulk_ferm_time_idx][j] +  outrange[proof_time_idx][j];
  }
return outrange;
}
    


