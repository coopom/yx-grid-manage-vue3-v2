define(["./AttributeCompression-ab5c33b7","./Cartesian2-697a9954","./Math-737a2579","./createTaskProcessorWorker","./Check-f3fec9b0","./when-54335d57"],function(g,b,d,a,e,r){"use strict";var w=32767,k=new b.Cartographic,v=new b.Cartesian3,y=new b.Rectangle,A=new b.Ellipsoid,M={min:void 0,max:void 0};return a(function(a,e){var r=new Uint16Array(a.positions);!function(a){a=new Float64Array(a);var e=0;M.min=a[e++],M.max=a[e++],b.Rectangle.unpack(a,2,y),e+=b.Rectangle.packedLength,b.Ellipsoid.unpack(a,e,A)}(a.packedBuffer);var t=y,n=A,i=M.min,s=M.max,o=r.length/3,c=r.subarray(0,o),u=r.subarray(o,2*o),p=r.subarray(2*o,3*o);g.AttributeCompression.zigZagDeltaDecode(c,u,p);for(var h=new Float64Array(r.length),l=0;l<o;++l){var f=c[l],m=u[l],C=p[l],f=d.CesiumMath.lerp(t.west,t.east,f/w),m=d.CesiumMath.lerp(t.south,t.north,m/w),C=d.CesiumMath.lerp(i,s,C/w),C=b.Cartographic.fromRadians(f,m,C,k),C=n.cartographicToCartesian(C,v);b.Cartesian3.pack(C,h,3*l)}return e.push(h.buffer),{positions:h.buffer}})});
