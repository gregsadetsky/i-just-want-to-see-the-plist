var Jt=Object.defineProperty;var zt=(o,n,s)=>n in o?Jt(o,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[n]=s;var Lt=(o,n,s)=>(zt(o,typeof n!="symbol"?n+"":n,s),s);function Wt(o,n){for(var s=0;s<n.length;s++){const u=n[s];if(typeof u!="string"&&!Array.isArray(u)){for(const y in u)if(y!=="default"&&!(y in o)){const d=Object.getOwnPropertyDescriptor(u,y);d&&Object.defineProperty(o,y,d.get?d:{enumerable:!0,get:()=>u[y]})}}}return Object.freeze(Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}))}(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const y of document.querySelectorAll('link[rel="modulepreload"]'))u(y);new MutationObserver(y=>{for(const d of y)if(d.type==="childList")for(const I of d.addedNodes)I.tagName==="LINK"&&I.rel==="modulepreload"&&u(I)}).observe(document,{childList:!0,subtree:!0});function s(y){const d={};return y.integrity&&(d.integrity=y.integrity),y.referrerPolicy&&(d.referrerPolicy=y.referrerPolicy),y.crossOrigin==="use-credentials"?d.credentials="include":y.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function u(y){if(y.ep)return;y.ep=!0;const d=s(y);fetch(y.href,d)}})();function Mt(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var Pt={exports:{}};(function(o){var n=function(s){var u=1e7,y=7,d=9007199254740992,I=B(d),O="0123456789abcdefghijklmnopqrstuvwxyz",C=typeof BigInt=="function";function w(t,e,r,i){return typeof t>"u"?w[0]:typeof e<"u"?+e==10&&!r?E(t):Zt(t,e,r,i):E(t)}function f(t,e){this.value=t,this.sign=e,this.isSmall=!1}f.prototype=Object.create(w.prototype);function h(t){this.value=t,this.sign=t<0,this.isSmall=!0}h.prototype=Object.create(w.prototype);function g(t){this.value=t}g.prototype=Object.create(w.prototype);function m(t){return-d<t&&t<d}function B(t){return t<1e7?[t]:t<1e14?[t%1e7,Math.floor(t/1e7)]:[t%1e7,Math.floor(t/1e7)%1e7,Math.floor(t/1e14)]}function A(t){P(t);var e=t.length;if(e<4&&it(t,I)<0)switch(e){case 0:return 0;case 1:return t[0];case 2:return t[0]+t[1]*u;default:return t[0]+(t[1]+t[2]*u)*u}return t}function P(t){for(var e=t.length;t[--e]===0;);t.length=e+1}function F(t){for(var e=new Array(t),r=-1;++r<t;)e[r]=0;return e}function M(t){return t>0?Math.floor(t):Math.ceil(t)}function H(t,e){var r=t.length,i=e.length,l=new Array(r),a=0,p=u,c,v;for(v=0;v<i;v++)c=t[v]+e[v]+a,a=c>=p?1:0,l[v]=c-a*p;for(;v<r;)c=t[v]+a,a=c===p?1:0,l[v++]=c-a*p;return a>0&&l.push(a),l}function q(t,e){return t.length>=e.length?H(t,e):H(e,t)}function G(t,e){var r=t.length,i=new Array(r),l=u,a,p;for(p=0;p<r;p++)a=t[p]-l+e,e=Math.floor(a/l),i[p]=a-e*l,e+=1;for(;e>0;)i[p++]=e%l,e=Math.floor(e/l);return i}f.prototype.add=function(t){var e=E(t);if(this.sign!==e.sign)return this.subtract(e.negate());var r=this.value,i=e.value;return e.isSmall?new f(G(r,Math.abs(i)),this.sign):new f(q(r,i),this.sign)},f.prototype.plus=f.prototype.add,h.prototype.add=function(t){var e=E(t),r=this.value;if(r<0!==e.sign)return this.subtract(e.negate());var i=e.value;if(e.isSmall){if(m(r+i))return new h(r+i);i=B(Math.abs(i))}return new f(G(i,Math.abs(r)),r<0)},h.prototype.plus=h.prototype.add,g.prototype.add=function(t){return new g(this.value+E(t).value)},g.prototype.plus=g.prototype.add;function R(t,e){var r=t.length,i=e.length,l=new Array(r),a=0,p=u,c,v;for(c=0;c<i;c++)v=t[c]-a-e[c],v<0?(v+=p,a=1):a=0,l[c]=v;for(c=i;c<r;c++){if(v=t[c]-a,v<0)v+=p;else{l[c++]=v;break}l[c]=v}for(;c<r;c++)l[c]=t[c];return P(l),l}function K(t,e,r){var i;return it(t,e)>=0?i=R(t,e):(i=R(e,t),r=!r),i=A(i),typeof i=="number"?(r&&(i=-i),new h(i)):new f(i,r)}function $(t,e,r){var i=t.length,l=new Array(i),a=-e,p=u,c,v;for(c=0;c<i;c++)v=t[c]+a,a=Math.floor(v/p),v%=p,l[c]=v<0?v+p:v;return l=A(l),typeof l=="number"?(r&&(l=-l),new h(l)):new f(l,r)}f.prototype.subtract=function(t){var e=E(t);if(this.sign!==e.sign)return this.add(e.negate());var r=this.value,i=e.value;return e.isSmall?$(r,Math.abs(i),this.sign):K(r,i,this.sign)},f.prototype.minus=f.prototype.subtract,h.prototype.subtract=function(t){var e=E(t),r=this.value;if(r<0!==e.sign)return this.add(e.negate());var i=e.value;return e.isSmall?new h(r-i):$(i,Math.abs(r),r>=0)},h.prototype.minus=h.prototype.subtract,g.prototype.subtract=function(t){return new g(this.value-E(t).value)},g.prototype.minus=g.prototype.subtract,f.prototype.negate=function(){return new f(this.value,!this.sign)},h.prototype.negate=function(){var t=this.sign,e=new h(-this.value);return e.sign=!t,e},g.prototype.negate=function(){return new g(-this.value)},f.prototype.abs=function(){return new f(this.value,!1)},h.prototype.abs=function(){return new h(Math.abs(this.value))},g.prototype.abs=function(){return new g(this.value>=0?this.value:-this.value)};function ut(t,e){var r=t.length,i=e.length,l=r+i,a=F(l),p=u,c,v,S,U,_;for(S=0;S<r;++S){U=t[S];for(var x=0;x<i;++x)_=e[x],c=U*_+a[S+x],v=Math.floor(c/p),a[S+x]=c-v*p,a[S+x+1]+=v}return P(a),a}function nt(t,e){var r=t.length,i=new Array(r),l=u,a=0,p,c;for(c=0;c<r;c++)p=t[c]*e+a,a=Math.floor(p/l),i[c]=p-a*l;for(;a>0;)i[c++]=a%l,a=Math.floor(a/l);return i}function b(t,e){for(var r=[];e-- >0;)r.push(0);return r.concat(t)}function L(t,e){var r=Math.max(t.length,e.length);if(r<=30)return ut(t,e);r=Math.ceil(r/2);var i=t.slice(r),l=t.slice(0,r),a=e.slice(r),p=e.slice(0,r),c=L(l,p),v=L(i,a),S=L(q(l,i),q(p,a)),U=q(q(c,b(R(R(S,c),v),r)),b(v,2*r));return P(U),U}function T(t,e){return-.012*t-.012*e+15e-6*t*e>0}f.prototype.multiply=function(t){var e=E(t),r=this.value,i=e.value,l=this.sign!==e.sign,a;if(e.isSmall){if(i===0)return w[0];if(i===1)return this;if(i===-1)return this.negate();if(a=Math.abs(i),a<u)return new f(nt(r,a),l);i=B(a)}return T(r.length,i.length)?new f(L(r,i),l):new f(ut(r,i),l)},f.prototype.times=f.prototype.multiply;function N(t,e,r){return t<u?new f(nt(e,t),r):new f(ut(e,B(t)),r)}h.prototype._multiplyBySmall=function(t){return m(t.value*this.value)?new h(t.value*this.value):N(Math.abs(t.value),B(Math.abs(this.value)),this.sign!==t.sign)},f.prototype._multiplyBySmall=function(t){return t.value===0?w[0]:t.value===1?this:t.value===-1?this.negate():N(Math.abs(t.value),this.value,this.sign!==t.sign)},h.prototype.multiply=function(t){return E(t)._multiplyBySmall(this)},h.prototype.times=h.prototype.multiply,g.prototype.multiply=function(t){return new g(this.value*E(t).value)},g.prototype.times=g.prototype.multiply;function D(t){var e=t.length,r=F(e+e),i=u,l,a,p,c,v;for(p=0;p<e;p++){c=t[p],a=0-c*c;for(var S=p;S<e;S++)v=t[S],l=2*(c*v)+r[p+S]+a,a=Math.floor(l/i),r[p+S]=l-a*i;r[p+e]=a}return P(r),r}f.prototype.square=function(){return new f(D(this.value),!1)},h.prototype.square=function(){var t=this.value*this.value;return m(t)?new h(t):new f(D(B(Math.abs(this.value))),!1)},g.prototype.square=function(t){return new g(this.value*this.value)};function Z(t,e){var r=t.length,i=e.length,l=u,a=F(e.length),p=e[i-1],c=Math.ceil(l/(2*p)),v=nt(t,c),S=nt(e,c),U,_,x,J,k,dt,wt;for(v.length<=r&&v.push(0),S.push(0),p=S[i-1],_=r-i;_>=0;_--){for(U=l-1,v[_+i]!==p&&(U=Math.floor((v[_+i]*l+v[_+i-1])/p)),x=0,J=0,dt=S.length,k=0;k<dt;k++)x+=U*S[k],wt=Math.floor(x/l),J+=v[_+k]-(x-wt*l),x=wt,J<0?(v[_+k]=J+l,J=-1):(v[_+k]=J,J=0);for(;J!==0;){for(U-=1,x=0,k=0;k<dt;k++)x+=v[_+k]-l+S[k],x<0?(v[_+k]=x+l,x=0):(v[_+k]=x,x=1);J+=x}a[_]=U}return v=Y(v,c)[0],[A(a),A(v)]}function j(t,e){for(var r=t.length,i=e.length,l=[],a=[],p=u,c,v,S,U,_;r;){if(a.unshift(t[--r]),P(a),it(a,e)<0){l.push(0);continue}v=a.length,S=a[v-1]*p+a[v-2],U=e[i-1]*p+e[i-2],v>i&&(S=(S+1)*p),c=Math.ceil(S/U);do{if(_=nt(e,c),it(_,a)<=0)break;c--}while(c);l.push(c),a=R(a,_)}return l.reverse(),[A(l),A(a)]}function Y(t,e){var r=t.length,i=F(r),l=u,a,p,c,v;for(c=0,a=r-1;a>=0;--a)v=c*l+t[a],p=M(v/e),c=v-p*e,i[a]=p|0;return[i,c|0]}function ot(t,e){var r,i=E(e);if(C)return[new g(t.value/i.value),new g(t.value%i.value)];var l=t.value,a=i.value,p;if(a===0)throw new Error("Cannot divide by zero");if(t.isSmall)return i.isSmall?[new h(M(l/a)),new h(l%a)]:[w[0],t];if(i.isSmall){if(a===1)return[t,w[0]];if(a==-1)return[t.negate(),w[0]];var c=Math.abs(a);if(c<u){r=Y(l,c),p=A(r[0]);var v=r[1];return t.sign&&(v=-v),typeof p=="number"?(t.sign!==i.sign&&(p=-p),[new h(p),new h(v)]):[new f(p,t.sign!==i.sign),new h(v)]}a=B(c)}var S=it(l,a);if(S===-1)return[w[0],t];if(S===0)return[w[t.sign===i.sign?1:-1],w[0]];l.length+a.length<=200?r=Z(l,a):r=j(l,a),p=r[0];var U=t.sign!==i.sign,_=r[1],x=t.sign;return typeof p=="number"?(U&&(p=-p),p=new h(p)):p=new f(p,U),typeof _=="number"?(x&&(_=-_),_=new h(_)):_=new f(_,x),[p,_]}f.prototype.divmod=function(t){var e=ot(this,t);return{quotient:e[0],remainder:e[1]}},g.prototype.divmod=h.prototype.divmod=f.prototype.divmod,f.prototype.divide=function(t){return ot(this,t)[0]},g.prototype.over=g.prototype.divide=function(t){return new g(this.value/E(t).value)},h.prototype.over=h.prototype.divide=f.prototype.over=f.prototype.divide,f.prototype.mod=function(t){return ot(this,t)[1]},g.prototype.mod=g.prototype.remainder=function(t){return new g(this.value%E(t).value)},h.prototype.remainder=h.prototype.mod=f.prototype.remainder=f.prototype.mod,f.prototype.pow=function(t){var e=E(t),r=this.value,i=e.value,l,a,p;if(i===0)return w[1];if(r===0)return w[0];if(r===1)return w[1];if(r===-1)return e.isEven()?w[1]:w[-1];if(e.sign)return w[0];if(!e.isSmall)throw new Error("The exponent "+e.toString()+" is too large.");if(this.isSmall&&m(l=Math.pow(r,i)))return new h(M(l));for(a=this,p=w[1];i&!0&&(p=p.times(a),--i),i!==0;)i/=2,a=a.square();return p},h.prototype.pow=f.prototype.pow,g.prototype.pow=function(t){var e=E(t),r=this.value,i=e.value,l=BigInt(0),a=BigInt(1),p=BigInt(2);if(i===l)return w[1];if(r===l)return w[0];if(r===a)return w[1];if(r===BigInt(-1))return e.isEven()?w[1]:w[-1];if(e.isNegative())return new g(l);for(var c=this,v=w[1];(i&a)===a&&(v=v.times(c),--i),i!==l;)i/=p,c=c.square();return v},f.prototype.modPow=function(t,e){if(t=E(t),e=E(e),e.isZero())throw new Error("Cannot take modPow with modulus 0");var r=w[1],i=this.mod(e);for(t.isNegative()&&(t=t.multiply(w[-1]),i=i.modInv(e));t.isPositive();){if(i.isZero())return w[0];t.isOdd()&&(r=r.multiply(i).mod(e)),t=t.divide(2),i=i.square().mod(e)}return r},g.prototype.modPow=h.prototype.modPow=f.prototype.modPow;function it(t,e){if(t.length!==e.length)return t.length>e.length?1:-1;for(var r=t.length-1;r>=0;r--)if(t[r]!==e[r])return t[r]>e[r]?1:-1;return 0}f.prototype.compareAbs=function(t){var e=E(t),r=this.value,i=e.value;return e.isSmall?1:it(r,i)},h.prototype.compareAbs=function(t){var e=E(t),r=Math.abs(this.value),i=e.value;return e.isSmall?(i=Math.abs(i),r===i?0:r>i?1:-1):-1},g.prototype.compareAbs=function(t){var e=this.value,r=E(t).value;return e=e>=0?e:-e,r=r>=0?r:-r,e===r?0:e>r?1:-1},f.prototype.compare=function(t){if(t===1/0)return-1;if(t===-1/0)return 1;var e=E(t),r=this.value,i=e.value;return this.sign!==e.sign?e.sign?1:-1:e.isSmall?this.sign?-1:1:it(r,i)*(this.sign?-1:1)},f.prototype.compareTo=f.prototype.compare,h.prototype.compare=function(t){if(t===1/0)return-1;if(t===-1/0)return 1;var e=E(t),r=this.value,i=e.value;return e.isSmall?r==i?0:r>i?1:-1:r<0!==e.sign?r<0?-1:1:r<0?1:-1},h.prototype.compareTo=h.prototype.compare,g.prototype.compare=function(t){if(t===1/0)return-1;if(t===-1/0)return 1;var e=this.value,r=E(t).value;return e===r?0:e>r?1:-1},g.prototype.compareTo=g.prototype.compare,f.prototype.equals=function(t){return this.compare(t)===0},g.prototype.eq=g.prototype.equals=h.prototype.eq=h.prototype.equals=f.prototype.eq=f.prototype.equals,f.prototype.notEquals=function(t){return this.compare(t)!==0},g.prototype.neq=g.prototype.notEquals=h.prototype.neq=h.prototype.notEquals=f.prototype.neq=f.prototype.notEquals,f.prototype.greater=function(t){return this.compare(t)>0},g.prototype.gt=g.prototype.greater=h.prototype.gt=h.prototype.greater=f.prototype.gt=f.prototype.greater,f.prototype.lesser=function(t){return this.compare(t)<0},g.prototype.lt=g.prototype.lesser=h.prototype.lt=h.prototype.lesser=f.prototype.lt=f.prototype.lesser,f.prototype.greaterOrEquals=function(t){return this.compare(t)>=0},g.prototype.geq=g.prototype.greaterOrEquals=h.prototype.geq=h.prototype.greaterOrEquals=f.prototype.geq=f.prototype.greaterOrEquals,f.prototype.lesserOrEquals=function(t){return this.compare(t)<=0},g.prototype.leq=g.prototype.lesserOrEquals=h.prototype.leq=h.prototype.lesserOrEquals=f.prototype.leq=f.prototype.lesserOrEquals,f.prototype.isEven=function(){return(this.value[0]&1)===0},h.prototype.isEven=function(){return(this.value&1)===0},g.prototype.isEven=function(){return(this.value&BigInt(1))===BigInt(0)},f.prototype.isOdd=function(){return(this.value[0]&1)===1},h.prototype.isOdd=function(){return(this.value&1)===1},g.prototype.isOdd=function(){return(this.value&BigInt(1))===BigInt(1)},f.prototype.isPositive=function(){return!this.sign},h.prototype.isPositive=function(){return this.value>0},g.prototype.isPositive=h.prototype.isPositive,f.prototype.isNegative=function(){return this.sign},h.prototype.isNegative=function(){return this.value<0},g.prototype.isNegative=h.prototype.isNegative,f.prototype.isUnit=function(){return!1},h.prototype.isUnit=function(){return Math.abs(this.value)===1},g.prototype.isUnit=function(){return this.abs().value===BigInt(1)},f.prototype.isZero=function(){return!1},h.prototype.isZero=function(){return this.value===0},g.prototype.isZero=function(){return this.value===BigInt(0)},f.prototype.isDivisibleBy=function(t){var e=E(t);return e.isZero()?!1:e.isUnit()?!0:e.compareAbs(2)===0?this.isEven():this.mod(e).isZero()},g.prototype.isDivisibleBy=h.prototype.isDivisibleBy=f.prototype.isDivisibleBy;function Et(t){var e=t.abs();if(e.isUnit())return!1;if(e.equals(2)||e.equals(3)||e.equals(5))return!0;if(e.isEven()||e.isDivisibleBy(3)||e.isDivisibleBy(5))return!1;if(e.lesser(49))return!0}function ht(t,e){for(var r=t.prev(),i=r,l=0,a,p,c;i.isEven();)i=i.divide(2),l++;t:for(p=0;p<e.length;p++)if(!t.lesser(e[p])&&(c=n(e[p]).modPow(i,t),!(c.isUnit()||c.equals(r)))){for(a=l-1;a!=0;a--){if(c=c.square().mod(t),c.isUnit())return!1;if(c.equals(r))continue t}return!1}return!0}f.prototype.isPrime=function(t){var e=Et(this);if(e!==s)return e;var r=this.abs(),i=r.bitLength();if(i<=64)return ht(r,[2,3,5,7,11,13,17,19,23,29,31,37]);for(var l=Math.log(2)*i.toJSNumber(),a=Math.ceil(t===!0?2*Math.pow(l,2):l),p=[],c=0;c<a;c++)p.push(n(c+2));return ht(r,p)},g.prototype.isPrime=h.prototype.isPrime=f.prototype.isPrime,f.prototype.isProbablePrime=function(t,e){var r=Et(this);if(r!==s)return r;for(var i=this.abs(),l=t===s?5:t,a=[],p=0;p<l;p++)a.push(n.randBetween(2,i.minus(2),e));return ht(i,a)},g.prototype.isProbablePrime=h.prototype.isProbablePrime=f.prototype.isProbablePrime,f.prototype.modInv=function(t){for(var e=n.zero,r=n.one,i=E(t),l=this.abs(),a,p,c;!l.isZero();)a=i.divide(l),p=e,c=i,e=r,i=l,r=p.subtract(a.multiply(r)),l=c.subtract(a.multiply(l));if(!i.isUnit())throw new Error(this.toString()+" and "+t.toString()+" are not co-prime");return e.compare(0)===-1&&(e=e.add(t)),this.isNegative()?e.negate():e},g.prototype.modInv=h.prototype.modInv=f.prototype.modInv,f.prototype.next=function(){var t=this.value;return this.sign?$(t,1,this.sign):new f(G(t,1),this.sign)},h.prototype.next=function(){var t=this.value;return t+1<d?new h(t+1):new f(I,!1)},g.prototype.next=function(){return new g(this.value+BigInt(1))},f.prototype.prev=function(){var t=this.value;return this.sign?new f(G(t,1),!0):$(t,1,this.sign)},h.prototype.prev=function(){var t=this.value;return t-1>-d?new h(t-1):new f(I,!0)},g.prototype.prev=function(){return new g(this.value-BigInt(1))};for(var tt=[1];2*tt[tt.length-1]<=u;)tt.push(2*tt[tt.length-1]);var lt=tt.length,at=tt[lt-1];function It(t){return Math.abs(t)<=u}f.prototype.shiftLeft=function(t){var e=E(t).toJSNumber();if(!It(e))throw new Error(String(e)+" is too large for shifting.");if(e<0)return this.shiftRight(-e);var r=this;if(r.isZero())return r;for(;e>=lt;)r=r.multiply(at),e-=lt-1;return r.multiply(tt[e])},g.prototype.shiftLeft=h.prototype.shiftLeft=f.prototype.shiftLeft,f.prototype.shiftRight=function(t){var e,r=E(t).toJSNumber();if(!It(r))throw new Error(String(r)+" is too large for shifting.");if(r<0)return this.shiftLeft(-r);for(var i=this;r>=lt;){if(i.isZero()||i.isNegative()&&i.isUnit())return i;e=ot(i,at),i=e[1].isNegative()?e[0].prev():e[0],r-=lt-1}return e=ot(i,tt[r]),e[1].isNegative()?e[0].prev():e[0]},g.prototype.shiftRight=h.prototype.shiftRight=f.prototype.shiftRight;function vt(t,e,r){e=E(e);for(var i=t.isNegative(),l=e.isNegative(),a=i?t.not():t,p=l?e.not():e,c=0,v=0,S=null,U=null,_=[];!a.isZero()||!p.isZero();)S=ot(a,at),c=S[1].toJSNumber(),i&&(c=at-1-c),U=ot(p,at),v=U[1].toJSNumber(),l&&(v=at-1-v),a=S[0],p=U[0],_.push(r(c,v));for(var x=r(i?1:0,l?1:0)!==0?n(-1):n(0),J=_.length-1;J>=0;J-=1)x=x.multiply(at).add(n(_[J]));return x}f.prototype.not=function(){return this.negate().prev()},g.prototype.not=h.prototype.not=f.prototype.not,f.prototype.and=function(t){return vt(this,t,function(e,r){return e&r})},g.prototype.and=h.prototype.and=f.prototype.and,f.prototype.or=function(t){return vt(this,t,function(e,r){return e|r})},g.prototype.or=h.prototype.or=f.prototype.or,f.prototype.xor=function(t){return vt(this,t,function(e,r){return e^r})},g.prototype.xor=h.prototype.xor=f.prototype.xor;var yt=1<<30,Ct=(u&-u)*(u&-u)|yt;function pt(t){var e=t.value,r=typeof e=="number"?e|yt:typeof e=="bigint"?e|BigInt(yt):e[0]+e[1]*u|Ct;return r&-r}function St(t,e){if(e.compareTo(t)<=0){var r=St(t,e.square(e)),i=r.p,l=r.e,a=i.multiply(e);return a.compareTo(t)<=0?{p:a,e:l*2+1}:{p:i,e:l*2}}return{p:n(1),e:0}}f.prototype.bitLength=function(){var t=this;return t.compareTo(n(0))<0&&(t=t.negate().subtract(n(1))),t.compareTo(n(0))===0?n(0):n(St(t,n(2)).e).add(n(1))},g.prototype.bitLength=h.prototype.bitLength=f.prototype.bitLength;function At(t,e){return t=E(t),e=E(e),t.greater(e)?t:e}function gt(t,e){return t=E(t),e=E(e),t.lesser(e)?t:e}function _t(t,e){if(t=E(t).abs(),e=E(e).abs(),t.equals(e))return t;if(t.isZero())return e;if(e.isZero())return t;for(var r=w[1],i,l;t.isEven()&&e.isEven();)i=gt(pt(t),pt(e)),t=t.divide(i),e=e.divide(i),r=r.multiply(i);for(;t.isEven();)t=t.divide(pt(t));do{for(;e.isEven();)e=e.divide(pt(e));t.greater(e)&&(l=e,e=t,t=l),e=e.subtract(t)}while(!e.isZero());return r.isUnit()?t:t.multiply(r)}function Rt(t,e){return t=E(t).abs(),e=E(e).abs(),t.divide(_t(t,e)).multiply(e)}function jt(t,e,r){t=E(t),e=E(e);var i=r||Math.random,l=gt(t,e),a=At(t,e),p=a.subtract(l).add(1);if(p.isSmall)return l.add(Math.floor(i()*p));for(var c=ft(p,u).value,v=[],S=!0,U=0;U<c.length;U++){var _=S?c[U]+(U+1<c.length?c[U+1]/u:0):u,x=M(i()*_);v.push(x),x<c[U]&&(S=!1)}return l.add(w.fromArray(v,u,!1))}var Zt=function(t,e,r,i){r=r||O,t=String(t),i||(t=t.toLowerCase(),r=r.toLowerCase());var l=t.length,a,p=Math.abs(e),c={};for(a=0;a<r.length;a++)c[r[a]]=a;for(a=0;a<l;a++){var v=t[a];if(v!=="-"&&v in c&&c[v]>=p){if(v==="1"&&p===1)continue;throw new Error(v+" is not a valid digit in base "+e+".")}}e=E(e);var S=[],U=t[0]==="-";for(a=U?1:0;a<t.length;a++){var v=t[a];if(v in c)S.push(E(c[v]));else if(v==="<"){var _=a;do a++;while(t[a]!==">"&&a<t.length);S.push(E(t.slice(_+1,a)))}else throw new Error(v+" is not a valid character")}return Bt(S,e,U)};function Bt(t,e,r){var i=w[0],l=w[1],a;for(a=t.length-1;a>=0;a--)i=i.add(t[a].times(l)),l=l.times(e);return r?i.negate():i}function kt(t,e){return e=e||O,t<e.length?e[t]:"<"+t+">"}function ft(t,e){if(e=n(e),e.isZero()){if(t.isZero())return{value:[0],isNegative:!1};throw new Error("Cannot convert nonzero numbers to base 0.")}if(e.equals(-1)){if(t.isZero())return{value:[0],isNegative:!1};if(t.isNegative())return{value:[].concat.apply([],Array.apply(null,Array(-t.toJSNumber())).map(Array.prototype.valueOf,[1,0])),isNegative:!1};var r=Array.apply(null,Array(t.toJSNumber()-1)).map(Array.prototype.valueOf,[0,1]);return r.unshift([1]),{value:[].concat.apply([],r),isNegative:!1}}var i=!1;if(t.isNegative()&&e.isPositive()&&(i=!0,t=t.abs()),e.isUnit())return t.isZero()?{value:[0],isNegative:!1}:{value:Array.apply(null,Array(t.toJSNumber())).map(Number.prototype.valueOf,1),isNegative:i};for(var l=[],a=t,p;a.isNegative()||a.compareAbs(e)>=0;){p=a.divmod(e),a=p.quotient;var c=p.remainder;c.isNegative()&&(c=e.minus(c).abs(),a=a.next()),l.push(c.toJSNumber())}return l.push(a.toJSNumber()),{value:l.reverse(),isNegative:i}}function Ot(t,e,r){var i=ft(t,e);return(i.isNegative?"-":"")+i.value.map(function(l){return kt(l,r)}).join("")}f.prototype.toArray=function(t){return ft(this,t)},h.prototype.toArray=function(t){return ft(this,t)},g.prototype.toArray=function(t){return ft(this,t)},f.prototype.toString=function(t,e){if(t===s&&(t=10),t!==10)return Ot(this,t,e);for(var r=this.value,i=r.length,l=String(r[--i]),a="0000000",p;--i>=0;)p=String(r[i]),l+=a.slice(p.length)+p;var c=this.sign?"-":"";return c+l},h.prototype.toString=function(t,e){return t===s&&(t=10),t!=10?Ot(this,t,e):String(this.value)},g.prototype.toString=h.prototype.toString,g.prototype.toJSON=f.prototype.toJSON=h.prototype.toJSON=function(){return this.toString()},f.prototype.valueOf=function(){return parseInt(this.toString(),10)},f.prototype.toJSNumber=f.prototype.valueOf,h.prototype.valueOf=function(){return this.value},h.prototype.toJSNumber=h.prototype.valueOf,g.prototype.valueOf=g.prototype.toJSNumber=function(){return parseInt(this.toString(),10)};function Ut(t){if(m(+t)){var e=+t;if(e===M(e))return C?new g(BigInt(e)):new h(e);throw new Error("Invalid integer: "+t)}var r=t[0]==="-";r&&(t=t.slice(1));var i=t.split(/e/i);if(i.length>2)throw new Error("Invalid integer: "+i.join("e"));if(i.length===2){var l=i[1];if(l[0]==="+"&&(l=l.slice(1)),l=+l,l!==M(l)||!m(l))throw new Error("Invalid integer: "+l+" is not a valid exponent.");var a=i[0],p=a.indexOf(".");if(p>=0&&(l-=a.length-p-1,a=a.slice(0,p)+a.slice(p+1)),l<0)throw new Error("Cannot include negative exponent part for integers");a+=new Array(l+1).join("0"),t=a}var c=/^([0-9][0-9]*)$/.test(t);if(!c)throw new Error("Invalid integer: "+t);if(C)return new g(BigInt(r?"-"+t:t));for(var v=[],S=t.length,U=y,_=S-U;S>0;)v.push(+t.slice(_,S)),_-=U,_<0&&(_=0),S-=U;return P(v),new f(v,r)}function Ht(t){if(C)return new g(BigInt(t));if(m(t)){if(t!==M(t))throw new Error(t+" is not an integer.");return new h(t)}return Ut(t.toString())}function E(t){return typeof t=="number"?Ht(t):typeof t=="string"?Ut(t):typeof t=="bigint"?new g(t):t}for(var st=0;st<1e3;st++)w[st]=E(st),st>0&&(w[-st]=E(-st));return w.one=w[1],w.zero=w[0],w.minusOne=w[-1],w.max=At,w.min=gt,w.gcd=_t,w.lcm=Rt,w.isInstance=function(t){return t instanceof f||t instanceof h||t instanceof g},w.randBetween=jt,w.fromArray=function(t,e,r){return Bt(t.map(E),E(e||10),r)},w}();o.hasOwnProperty("exports")&&(o.exports=n)})(Pt);var Tt=Pt.exports;const Vt=Mt(Tt),Gt=Wt({__proto__:null,default:Vt},[Tt]);var bt={};(function(o){(function(n){var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=typeof Uint8Array<"u"?Uint8Array:Array,y="+".charCodeAt(0),d="/".charCodeAt(0),I="0".charCodeAt(0),O="a".charCodeAt(0),C="A".charCodeAt(0),w="-".charCodeAt(0),f="_".charCodeAt(0);function h(B){var A=B.charCodeAt(0);if(A===y||A===w)return 62;if(A===d||A===f)return 63;if(A<I)return-1;if(A<I+10)return A-I+26+26;if(A<C+26)return A-C;if(A<O+26)return A-O+26}function g(B){var A,P,F,M,H,q;if(B.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var G=B.length;H=B.charAt(G-2)==="="?2:B.charAt(G-1)==="="?1:0,q=new u(B.length*3/4-H),F=H>0?B.length-4:B.length;var R=0;function K($){q[R++]=$}for(A=0,P=0;A<F;A+=4,P+=3)M=h(B.charAt(A))<<18|h(B.charAt(A+1))<<12|h(B.charAt(A+2))<<6|h(B.charAt(A+3)),K((M&16711680)>>16),K((M&65280)>>8),K(M&255);return H===2?(M=h(B.charAt(A))<<2|h(B.charAt(A+1))>>4,K(M&255)):H===1&&(M=h(B.charAt(A))<<10|h(B.charAt(A+1))<<4|h(B.charAt(A+2))>>2,K(M>>8&255),K(M&255)),q}function m(B){var A,P=B.length%3,F="",M,H;function q(R){return s.charAt(R)}function G(R){return q(R>>18&63)+q(R>>12&63)+q(R>>6&63)+q(R&63)}for(A=0,H=B.length-P;A<H;A+=3)M=(B[A]<<16)+(B[A+1]<<8)+B[A+2],F+=G(M);switch(P){case 1:M=B[B.length-1],F+=q(M>>2),F+=q(M<<4&63),F+="==";break;case 2:M=(B[B.length-2]<<8)+B[B.length-1],F+=q(M>>10),F+=q(M>>4&63),F+=q(M<<2&63),F+="=";break}return F}n.toByteArray=g,n.fromByteArray=m})(o)})(bt);var Xt=Qt,Kt=bt,Yt={hex:$t,utf8:te,base64:ne};function Qt(o,n){return Array.isArray(o)?new Uint8Array(o):Yt[n||"utf8"](o)}function $t(o){for(var n=o.length/2,s=new Uint8Array(n),u="",y=0,d=o.length;y<d;++y)u+=o.charAt(y),y>0&&y%2===1&&(s[y>>>1]=parseInt(u,16),u="");return s}function te(o){for(var n=[],s,u=0,y=o.length;u<y;++u)if(s=re(o,u),s!==!1){if(s<128){n[n.length]=s;continue}ee(n,s)}return new Uint8Array(n)}function ee(o,n){var s=n,u=0,y,d,I,O;do++u;while(s>>>=1);for(y=Math.ceil((u-1)/5)|0,d=[0,0,192,224,240,248,252][y],O=[0,0,3,4,5,6,7][y],I|=d,u=7-O+6*(y-1);u;)I|=+!!(n&1<<u)<<7-O,++O,O%8===0&&(o[o.length]=I,I=128,O=2),--u;O&&(I|=+!!(n&1)<<7-O,o[o.length]=I)}function re(o,n){n=n||0;var s=o.charCodeAt(n),u,y;if(55296<=s&&s<=56319){if(u=o.charCodeAt(n+1),y=s,isNaN(u))throw new Error("High surrogate not followed by low surrogate");return(y-55296)*1024+(u-56320)+65536}return 56320<=s&&s<=57343?!1:s}function ne(o){return new Uint8Array(Kt.toByteArray(o))}var oe=ae,rt=[],X=[],mt=String.fromCharCode,ie=[64,32,16,8,4,2,1],Nt=[0,1,3,7,15,31,63,127];function ae(o,n,s){s=s===void 0?o.length:s;var u=0,y=128,d=0,I,O;for(X.length=rt.length=0;u<o.length;)O=o[u],!d&&O&y?(I=se(O),d+=I,I<8&&(X[X.length]=O&Nt[6-I])):d?(X[X.length]=O&Nt[6],--d,!d&&X.length&&(rt[rt.length]=mt(xt(X)),X.length=0)):rt[rt.length]=mt(O),++u;return X.length&&!d&&(rt[rt.length]=mt(xt(X)),X.length=0),rt.join("")}function se(o){for(var n=0;n<7&&o&ie[n];++n);return n}function xt(o){for(var n=0,s=0,u=o.length;s<u;++s)n|=o[s]<<(u-s-1)*6;return n}var ue=ce,le=bt,fe=oe,pe={hex:he,utf8:ve,base64:ye};function ce(o,n){return pe[n||"utf8"](o)}function he(o){for(var n="",s,u=0,y=o.length;u<y;++u)s=o[u],n+=((s&240)>>>4).toString(16),n+=(s&15).toString(16);return n}function ve(o){return fe(o)}function ye(o){return le.fromByteArray(o)}var ge=function(o){return o instanceof Uint8Array},de=we;function we(o,n,s){return o.subarray(n||0,s||o.length)}var me=be;function be(o,n){if(!o.length)return new Uint8Array(0);for(var s=n!==void 0?n:Ee(o),u=new Uint8Array(s),y=o[0],d=y.length,I=0,O=0,C=0;C<s;){if(O===d){O=0,++I,y=o[I],d=y&&y.length;continue}u[C++]=y[O++]}return u}function Ee(o){for(var n=0,s=0,u=o.length;s<u;++s)n+=o[s].byteLength;return n}var Ie=Ae,Se=[].slice;function Ae(o,n,s,u,y){if(s=arguments.length<3?0:s,u=arguments.length<4?0:u,y=arguments.length<5?o.length:y,y!==u&&!(n.length===0||o.length===0))return y>o.length&&(y=o.length),n.length-s<y-u&&(y=n.length-s+u),o.buffer!==n.buffer?_e(o,n,s,u,y):Be(o,n,s,u,y)}function _e(o,n,s,u,y){for(var d=y-u+s,I=s,O=u;I<d;++I,++O)n[I]=o[O]}function Be(o,n,s,u,y){for(var d=y+u,I=new Uint8Array(Se.call(o,u,d)),O=0;u<d;++u,++O)n[s++]=I[O]}var Oe=function(o){return new Uint8Array(o)},qt,ct,Dt=qt={};ct=typeof WeakMap>"u"?null:new WeakMap;qt.get=ct?Le:Ue;function Ue(o){return new DataView(o.buffer,0)}function Le(o){var n=ct.get(o.buffer);return n||ct.set(o.buffer,n=new DataView(o.buffer,0)),n}var Ne={readUInt8:xe,readInt8:Me,readUInt16LE:Pe,readUInt32LE:Te,readInt16LE:qe,readInt32LE:De,readFloatLE:Fe,readDoubleLE:Ce,readUInt16BE:Re,readUInt32BE:je,readInt16BE:Ze,readInt32BE:ke,readFloatBE:He,readDoubleBE:Je},W=Dt;function xe(o,n){return o[n]}function Me(o,n){var s=o[n];return s<128?s:s-256}function Pe(o,n){var s=W.get(o);return s.getUint16(n+o.byteOffset,!0)}function Te(o,n){var s=W.get(o);return s.getUint32(n+o.byteOffset,!0)}function qe(o,n){var s=W.get(o);return s.getInt16(n+o.byteOffset,!0)}function De(o,n){var s=W.get(o);return s.getInt32(n+o.byteOffset,!0)}function Fe(o,n){var s=W.get(o);return s.getFloat32(n+o.byteOffset,!0)}function Ce(o,n){var s=W.get(o);return s.getFloat64(n+o.byteOffset,!0)}function Re(o,n){var s=W.get(o);return s.getUint16(n+o.byteOffset,!1)}function je(o,n){var s=W.get(o);return s.getUint32(n+o.byteOffset,!1)}function Ze(o,n){var s=W.get(o);return s.getInt16(n+o.byteOffset,!1)}function ke(o,n){var s=W.get(o);return s.getInt32(n+o.byteOffset,!1)}function He(o,n){var s=W.get(o);return s.getFloat32(n+o.byteOffset,!1)}function Je(o,n){var s=W.get(o);return s.getFloat64(n+o.byteOffset,!1)}var ze={writeUInt8:We,writeInt8:Ve,writeUInt16LE:Ge,writeUInt32LE:Xe,writeInt16LE:Ke,writeInt32LE:Ye,writeFloatLE:Qe,writeDoubleLE:$e,writeUInt16BE:tr,writeUInt32BE:er,writeInt16BE:rr,writeInt32BE:nr,writeFloatBE:or,writeDoubleBE:ir},V=Dt;function We(o,n,s){return o[s]=n}function Ve(o,n,s){return o[s]=n<0?n+256:n}function Ge(o,n,s){var u=V.get(o);return u.setUint16(s+o.byteOffset,n,!0)}function Xe(o,n,s){var u=V.get(o);return u.setUint32(s+o.byteOffset,n,!0)}function Ke(o,n,s){var u=V.get(o);return u.setInt16(s+o.byteOffset,n,!0)}function Ye(o,n,s){var u=V.get(o);return u.setInt32(s+o.byteOffset,n,!0)}function Qe(o,n,s){var u=V.get(o);return u.setFloat32(s+o.byteOffset,n,!0)}function $e(o,n,s){var u=V.get(o);return u.setFloat64(s+o.byteOffset,n,!0)}function tr(o,n,s){var u=V.get(o);return u.setUint16(s+o.byteOffset,n,!1)}function er(o,n,s){var u=V.get(o);return u.setUint32(s+o.byteOffset,n,!1)}function rr(o,n,s){var u=V.get(o);return u.setInt16(s+o.byteOffset,n,!1)}function nr(o,n,s){var u=V.get(o);return u.setInt32(s+o.byteOffset,n,!1)}function or(o,n,s){var u=V.get(o);return u.setFloat32(s+o.byteOffset,n,!1)}function ir(o,n,s){var u=V.get(o);return u.setFloat64(s+o.byteOffset,n,!1)}var Q={},ar=Q;Q.from=Xt;Q.to=ue;Q.is=ge;Q.subarray=de;Q.join=me;Q.copy=Ie;Q.create=Oe;Ft(Ne,Q);Ft(ze,Q);function Ft(o,n){for(var s in o)n[s]=o[s]}const et=Mt(ar),z=100*1e3*1e3,sr=32768,ur=9783072e5;class lr{constructor(n){this.id=n}}class fr{constructor(){Lt(this,"debug",!1)}parse64Content(n){const s=atob(n),u=s.length,y=et.create(u);for(let d=0;d<u;d++)y[d]=s.charCodeAt(d);return this.parseBuffer(y)}parseBuffer(n){if(et.to(n.slice(0,6))!=="bplist")throw new Error("Invalid binary plist. Expected 'bplist' at offset 0.");const y=n.slice(n.length-32,n.length),d=et.readUInt8(y,6);this.debug&&console.log("offsetSize: "+d);const I=et.readUInt8(y,7);this.debug&&console.log("objectRefSize: "+I);const O=this.readUInt64BE(y,8);this.debug&&console.log("numObjects: "+O);const C=this.readUInt64BE(y,16);this.debug&&console.log("topObject: "+C);const w=this.readUInt64BE(y,24);if(this.debug&&console.log("offsetTableOffset: "+w),O>sr)throw new Error("maxObjectCount exceeded");const f=[];for(let g=0;g<O;g++){const m=n.slice(w+g*d,w+(g+1)*d);f[g]=this.readUInt(m,0),this.debug}const h=g=>{const m=f[g],B=n[m],A=(B&240)>>4,P=B&15,F=()=>{switch(P){case 0:return null;case 8:return!1;case 9:return!0;case 15:return null;default:throw new Error("Unhandled simple type 0x"+A.toString(16))}},M=b=>{let L="",T;for(T=0;T<b.length&&b[T]===0;T++);for(;T<b.length;T++){const N="00"+b[T].toString(16);L+=N.substr(N.length-2)}return L},H=()=>{const b=Math.pow(2,P);if(b>4){const L=n.slice(m+1,m+1+b),T=M(L);return Gt(T,16)}if(b<z)return this.readUInt(n.slice(m+1,m+1+b));throw new Error("Too little heap space available! Wanted to read "+b+" bytes, but only "+z+" are available.")},q=()=>{const b=P+1;if(b<z)return new lr(this.readUInt(n.slice(m+1,m+1+b)));throw new Error("To little heap space available! Wanted to read "+b+" bytes, but only "+z+" are available.")},G=()=>{const b=Math.pow(2,P);if(b<z){const L=n.slice(m+1,m+1+b);if(b===4)return et.readFloatBE(L,0);if(b===8)return et.readDoubleBE(L,0)}else throw new Error("To little heap space available! Wanted to read "+b+" bytes, but only "+z+" are available.")},R=()=>{P!==3&&console.error("Unknown date type :"+P+". Parsing anyway...");const b=n.slice(m+1,m+9);return new Date(ur+1e3*et.readDoubleBE(b,0))},K=()=>{let b=1,L=P;if(P===15){const T=n[m+1],N=(T&240)/16;N!==1&&console.error("0x4: UNEXPECTED LENGTH-INT TYPE! "+N);const D=T&15,Z=Math.pow(2,D);b=2+Z,Z<3?L=this.readUInt(n.slice(m+2,m+2+Z)):L=this.readUInt(n.slice(m+2,m+2+Z))}if(L<z)return n.slice(m+b,m+b+L);throw new Error("To little heap space available! Wanted to read "+L+" bytes, but only "+z+" are available.")},$=b=>{b=b||0;let L="utf8",T=P,N=1;if(P===15){const D=n[m+1],Z=(D&240)/16;Z!==1&&console.error("UNEXPECTED LENGTH-INT TYPE! "+Z);const j=D&15,Y=Math.pow(2,j);N=2+Y,Y<3?T=this.readUInt(n.slice(m+2,m+2+Y)):T=this.readUInt(n.slice(m+2,m+2+Y))}if(T*=b+1,T<z){let D=et.to(n.slice(m+N,m+N+T));return b&&(D=this.swapBytes(D),L="ucs2"),D.toString(L)}else throw new Error("To little heap space available! Wanted to read "+T+" bytes, but only "+z+" are available.")},ut=()=>{let b=P,L=1;if(P===15){const N=n[m+1],D=(N&240)/16;D!==1&&console.error("0xa: UNEXPECTED LENGTH-INT TYPE! "+D);const Z=N&15,j=Math.pow(2,Z);L=2+j,j<3?b=this.readUInt(n.slice(m+2,m+2+j)):b=this.readUInt(n.slice(m+2,m+2+j))}if(b*I>z)throw new Error("To little heap space available!");const T=[];for(let N=0;N<b;N++){const D=this.readUInt(n.slice(m+L+N*I,m+L+(N+1)*I));T[N]=h(D)}return T},nt=()=>{let b=P,L=1;if(P===15){const N=n[m+1],D=(N&240)/16;D!==1&&console.error("0xD: UNEXPECTED LENGTH-INT TYPE! "+D);const Z=N&15,j=Math.pow(2,Z);L=2+j,j<3?b=this.readUInt(n.slice(m+2,m+2+j)):b=this.readUInt(n.slice(m+2,m+2+j))}if(b*2*I>z)throw new Error("To little heap space available!");this.debug&&console.log("Parsing dictionary #"+g);const T={};for(let N=0;N<b;N++){const D=this.readUInt(n.slice(m+L+N*I,m+L+(N+1)*I)),Z=this.readUInt(n.slice(m+L+b*I+N*I,m+L+b*I+(N+1)*I)),j=h(D),Y=h(Z);this.debug&&console.log("  DICT #"+g+": Mapped "+j+" to "+Y),T[j]=Y}return T};switch(A){case 0:return F();case 1:return H();case 8:return q();case 2:return G();case 3:return R();case 4:return K();case 5:return $();case 6:return $(!0);case 10:return ut();case 13:return nt();default:throw new Error("Unhandled type 0x"+A.toString(16))}};return[h(C)]}readUInt(n,s){s=s||0;let u=0;for(let y=s;y<n.length;y++)u<<=8,u|=n[y]&255;return u}readUInt64BE(n,s){const u=n.slice(s,s+8);return et.readUInt32BE(u,4,8)}swapBytes(n){const s=n.length;for(let u=0;u<s;u+=2){const y=n[u];n[u]=n[u+1],n[u+1]=y}return n}}window.addEventListener("load",function(o){document.querySelector("#app").innerHTML=`
    <h2 class='dropHere'>drop your (binary) .plist file here!</h2>
  `;const n=document.querySelector(".dropHere");console.log("dropZoneEl",n);function s(y){console.log("dragHandlerFunction"),y.preventDefault(),y.stopPropagation(),n.classList.remove("fileBeingDraggedOver");const d=y.dataTransfer.files[0];(O=>new Promise((C,w)=>{const f=new FileReader;f.readAsDataURL(O),f.onload=()=>C(f.result),f.onerror=w}))(d).then(O=>{const C=O.split(",")[1];document.querySelector("#app").innerHTML=`
      <button id='copyit' style="color:blue;font-size:25px">click here to copy the json'ified plist into your clipboard!!</button>
    `;const w=document.querySelector("#copyit");w.addEventListener("click",f=>{const h=new fr;navigator.clipboard.writeText(JSON.stringify(h.parse64Content(C))),w.innerText="copied! click again to copy again"})})}function u(y){y.addEventListener("dragenter",d=>{d.preventDefault(),d.stopPropagation(),n.classList.add("fileBeingDraggedOver")},!1),y.addEventListener("dragleave",d=>{d.preventDefault(),d.stopPropagation(),n.classList.remove("fileBeingDraggedOver")},!1),y.addEventListener("dragover",d=>{d.preventDefault(),d.stopPropagation()},!1),y.addEventListener("drop",s,!1)}u(n)});