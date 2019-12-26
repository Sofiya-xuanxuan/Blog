# typescript学习
## 1. 初识TypeScript
浏览器只识别html、css、js，css预编译的样式处理器，浏览器不能识别，必须解析，ts也不能被浏览器识别，必须转换成js，才能被浏览器识别，所以我们需要对应的插件，将ts转成浏览器可识别的js，ts是编译型语言
- **什么是TypeScript**
  

微软开发

JavaScript超集

遵循ES6

类、模块

- **学习TypeScript的好处**

支持ES6规范

强大的IDE支持

angular2的开发语言

- **ts特点**

类型注解和编译时类型检查

基于类的面向对象编程

泛型

接口

声明文件

...

- **ts和ES6**

![ts与ES6的关系](https://i.loli.net/2019/12/24/d9twJ8fq76FLMaK.png)

    1. TS是angular的more开发语言
    
    2. 即将面世的Vue3也将使用TS
    
    3. 现有vue和react项目也可以通过ts改善开发体验和代码质量


## 2. 准备工作
- **新建一个基于ts的vue项目**
```
vue create vue-ts
```
选项选择：
```
1.自定义选项-Manually select features

2.添加ts支持-TypeScript

3.基于类的组件-y

4.tslint
```
//！是为了告诉typescript，msg必须传，{required:true}是告诉vue，msg必须传
- **安装**
  

npm i -g typescript
- **单独编译**
  

将ts文件编译成js文件
    
tsc app.ts
- **全部ts文件编译**
    1. tsc --init
    2. 生成tsconfig.json文件
    3. tsc 命令即可将所有的ts文件转成js文件
- **vscode 插件-live server**
  

相当于热更新

- **vscode 插件-typescript auto compile**

在ts文件里面做修改后，会直接更新到js文件中，不需要执行tsc命令了

- **webstorm自动编译ts文件**

setting-file watchers-+-typescript-做相关配置
[ts自动编译配置链接](http://blog.chinaunix.net/uid-30198739-id-5739410.html).

## 2. typescript基本数据类型和报错解析
### 基本数据类型
- **number**

和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。
```
let num=25;整数
let flo=25.5;浮点数
let hex=0xf000;十六进制
let binary=0b1001;二进制
let octal=0o733;八进制
```
重新赋值

不能存储非原有的类型数据（即不能更改数据类型）
```
num='25'//这是会报错的，is not assignable to type 'number'.
num=24.5//这是OK的
```
ts原型
```
let num=25;
等同于
let num:number=25;
```
- **boolean**

最基本的数据类型就是简单的true/false值，在JavaScript和TypeScript里叫做boolean（其它语言中也一样）。
```
let isLogin:boolean=false;
//更改
isLogin=1;//会报错
```
- **string**

JavaScript程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 string表示文本数据类型。 和JavaScript一样，可以使用双引号（ "）或单引号（'）表示字符串。
```
let str:string='hello world';
str='hhh'
```
你还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（ `），并且以${ expr }这种形式嵌入表达式
```
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`;
```
- **数组**

TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 

第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：
```
let list:number[]=[1,2]

let anyArray:any[]=['hehe',1,false]//任意类型
```
第二种方式是使用数组泛型，Array<元素类型>：

```
let names:Array<string>=['henry','bucky']//尖括号中表示数组中存储的类型
names[0]=100//会报错-更改了数据类型
names[0]='hello';

let list:Array<number>=[1,2]//使用数组泛型，Array<元素类型>
```
- **元祖Tuple**

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
```
let colors:[string,number]=['hello',99]

// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Errors
```
- **枚举**

enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
```
enum

enum Color{
    Black,//0
    Yellow=100,//100
    Red//101
}

let myColor:Color=Color.Yellow
console.log(myColor)//100
```
枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
```
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```
- **任意类型Any**

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量：
```
let anything;//等同于 let anything:any
anything=25;
anything='hello'

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```
当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：
```
let list: any[] = [1, true, "free"];

list[1] = 100;
```
- **Void**

某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
```
function warnUser(): void {
    console.log("This is my warning message");
}
```
<font color='red'>声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：</font>
```
let unusable: void = undefined;
```
- **Null 和 Undefined**

TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：
```
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```
<font color='red'>默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。</font>

非严格模式下，可以给任何类型赋值为null或者undefined；

严格模式下，不可以重新赋值给nul或者undefined

但是null和undefined直接可以来回切换赋值

- **never**

never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

never是任何类型的子类型，可以赋值给任何类型

然而，没有类型是never的子类型或可以赋值给nerve类型（除never本身之外）

即使any也不可以赋值给never，通常表现为抛出异常或无法执行到终止点（例如无线循环）

下面是一些返回never类型的函数：

```
let x:never;
x=123;//会报错，不能将其他类型转为never类型

//never的应该场景-抛出异常
function error(message:string):never{
    throw new Error(message)
}

//never的应该场景-死循环
function loop():never{
    while(true){}
}

let y:number;
y=(()=>{
    throw new Error 'message'//抛出异常，言外之意就是never类型，相当于给number类型重新赋值了never类型
})()
```
- **Object**

object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

使用object类型，就可以更好的表示像Object.create这样的API。例如：
```
let dataObj:{name:string,age:number}={
    name:'Henry',
    age:31
}
dataObj={
    name:'hello',
    age:12
}

declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```
<font color='red'>复杂对象类型</font>
```
let complex:{data:number[];myfunc:(item:number)=>number[]}={
    data:[1,2,3],
    myfunc:function(item:number):number[]{
        this.data.push(item)
        return this.data
    }
}
console.log(complex.myfunc(30))
```
<font color='red'>type</font>

生成自己需要的对象类型

```
type MyType={data:number[];myfunc:(item:number)=>number[]}
let complex:MyType={
    data:[1,2,3],
    myfunc:function(item:number):number[]{
        this.data.push(item)
        return this.data
    }
}
console.log(complex.myfunc(30))
```
- **union type**

检查类型 null、undefined、never

```
let unionType:number|string|boolean=12;
unionType=12;
unionType='hello';
unionType=true;//只要是以上三种数据类型就可以，别的类型会报错
```

- **检查类型**
```
let checkType=10;
if(typeof checkType=='number') {//类型的名字要用引号
    console.log('number')
}
```
## 3. TypeScript函数
- **函数类型**
```
let myFunc:(a:number,b:number)=>number;

myFunc=sumValue;
myFunc(5,5)
```
- **函数返回值类型**
```
function returnValue():string{
    return 'hello'
}
returnValue()
```

- **空函数没有任何返回值**
```
function sayHello():void{
    console.log('hello !@');
}
```
- **参数返回值**
```
function sumValue(value1:number,value2:number):number {//冒号之后的表示返回值类型
    return vaule1+value2
    //return value1*value2//如果两个参数中有一个不是数值，那么返回NaN
}
sumValue(1,2)
```
- **可选参数和默认参数**

TypeScript里的每个函数参数都是必须的。 这不是指不能传递 null或undefined作为参数，而是说编译器检查用户是否为每个参数都传入了值。 编译器还会假设只有这些参数会被传递进函数。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。
```
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right
```
JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能。 比如，我们想让last name是可选的：
```
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```
可选参数必须跟在必须参数后面。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。

在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。 让我们修改上例，把last name的默认值设置为"Smith"。
```
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```
在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型。
```
function buildName(firstName: string, lastName?: string) {
    // ...
}
```
和
```
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```
共享同样的类型(firstName: string, lastName?: string) => string。 默认参数的默认值消失了，只保留了它是一个可选参数的信息。

与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。 例如，我们重写最后一个例子，让 firstName是带默认值的参数：
```
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```
- **剩余参数**
必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 arguments来访问所有传入的参数。

在TypeScript里，你可以把所有参数收集到一个变量里：
```
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```
剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号（ ...）后面给定的名字，你可以在函数体内使用这个数组。

这个省略号也会在带有剩余参数的函数类型定义上使用到：
```
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```
## 4. 类的继承

面向对象：

- 通过extends实现继承
- 使用public等访问修饰符实现封装
- 通过方法覆盖实现多态

注意事项：

- 私有private：当成员被标记成private时，它就不能在声明它的类的外部访问
- 保护protected：protected成员在派生类中仍然可以访问
- 只读readonly：只读属性必须在声明时或构造函数里被初始化
- 参数属性：给构造函数的参数加上修饰符，能够定义并初始化一个成员属性
```
class Shape {
    //没有加前缀的，则默认是public的
    area:number
    protected color:string

    constructor(color:string,width:number,height:number){
        this.area=width * height
        this.color=color
    }

    shoutout(){
        return "I'm"+this.color+"with an area of"+this.area+"cm squared"
    }
}
//省略成员属性的办法
class Shape {
    //没有加前缀的，则默认是public的
    area:number
    
    constructor(protected color:string,width:number,height:number){
        this.area=width * height
        this.color=color
    }
}
```
- 存取器：当获取和设置属性时有额外逻辑时，可以使用存取器（又称getter、setter）
```
class Shape {
    //没有加前缀的，则默认是public的
    //area:number
    
    constructor(protected color:string,private width:number,private height:number){
        //this.area=width * height
        this.color=color
    }
    get area(){
        return this.width * this.height
    }
}
```

## 5. 接口继承及类的实现
接口仅约束结构，不要求实现，使用更简单

只约束类型，不关心里面有没有值
```
interface Person {
    firstName: string;
    lastName: string;
    sayHello(): string; // 要求实现⽅方法
}
// 实现接⼝口
class Greeter implements Person {
    constructor(public firstName='', public lastName=''){}
    sayHello(){
        return 'Hello, ' + this.firstName + ' ' + this.lastName;
    }
}
// ⾯面向接⼝口编程
function greeting(person: Person) {
    return person.sayHello();
}
// const user = {firstName: 'Jane', lastName: 'User'};
const user = new Greeter('Jane', 'User'); // 创建对象实例例
console.log(user);
console.log(greeting(user));
```

面向接口编程


## 6. 泛型Generic
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
```
// 定义泛型接⼝口
interface Result<T> {
ok: 0 | 1;
data: T[];
}
// 定义泛型函数
function getData<T>(): Result<T> {
const data: any[] = [
{ id: 1, name: "类型注解", version: "2.0" },
{ id: 2, name: "编译型语⾔言", version: "1.0" }
];
return { ok: 1, data };
}
// 使⽤用泛型
this.features = getData<Feature>().data;
```
## 7. 装饰器
装饰器实际上是工厂函数，传入一个对象，输出处理后的新对象

典型应用是组件装饰器@Component

- @Component
```
@Component
export default class Hello extends Vue {}
```
若不加小括号，则装饰器下面紧挨着的对象就是目标对象

若装饰器需要配置，则要以函数形式使用并传入配置：
```
@Component({
    props:{
        name:{
            type:String,
            default:'匿名'
        }
    }
})
export default class Hello extends Vue {
    @Prop({required: true,type:String}) private msg!: string;//与上面是异曲同工的
}
```
- @Emit()
```
//通知父类新增事件，若未指定事件名则函数名作为事件名（羊肉串形式）
@Emit()
private addFeature(event:any){//若没有返回值形参将作为事件参数
    const feature={name:event.target.value,id:this.features.length,version:'3.0'}
    this.features.push(feature);
    event.target.value='';
    return feature;//返回值作为事件参数
}
//父组件接收并处理：Hoem.vue
<hello msg="Welcome to Your Vue.js + TypeScript App" @add-feature="onAddFeature"/>

export default class Home extends Vue {
    private onAddFeature(feature:any){
        console.log(feature.name);
    }
}
```
- @watch()
```
// 函数装饰器器
@Watch("features", {deep: true})
onRouteChange(val: string, oldVal: any) {
console.log(val, oldVal);
}
```

## 7. TypeScript-类型练习
```
type SumValue={money:number;count:(val:number)=>void};

let sumValue:SumValue={
    money:200,
    count(value:number):void{
        this.money+value
    }
}

let handleCount:{
    name:string,
    sumValue:SumValue//type定义的
    friends:string[]
}={
    name:'Henry',
    sumValue:sumValue,
    friends:['bucky','eleys']
}

handleCount.sumValue.count(999);
console.log(handleCount)
```

## 8. TypeScript-类(属性和方法)

使用类的方式来实现面向对象编程
```
class Cat {
    name:string;//属性
    sayHi():string{//方法
        return `Meow,my name is ${this.name}`;
    }
}

let tom=new Cat();
tom.name='Tom';
tom.sayHi();
```


## 10. TypeScript-set和get和static

## 11. TypeScript-初始命名空间namespace

## 12. TypeScript-命名空间文件拆分

## 13. TypeScript-多重命名空间及引入文件

## 14. TypeScript-模块module的使用

## 15. TypeScript-初始interface接口的用法

## 16. TypeScript-接口继承及类的实现