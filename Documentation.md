Table of Contents
=================
   * [Table of Contents](#table-of-contents)
   * [Prefixes](#prefixes)
   * [Data Structure](#data-structure)
   * [Usage](#usage)
      * [Storing Data](#storing-data)
      * [Getting Data](#getting-data)
      * [Removing Data](#removing-data)
      * [Checking If Data Exists](#checking-if-data-exists)
      * [Getting Sizes](#getting-sizes)
      * [Purging Data](#purging-data)
   * [Examples](#examples)

Prefixes
========
Prefixes are used to help organize data stored using the Local Storage API. They are a great way to separate data from "SiteA" and "SiteB", for example.

It's good practice to define the prefix variable within the first couple lines of the website's main script.

An example of how to use/create prefixes, can be shown in the following example:

```javascript
const prefix = "SiteA";
```
This will set the prefix so it's easier to call back later. (This will keep up consistancy throughout your website.)

Data Structure
==============
The Local Storage API's data structure is composed of two components: A [prefix](#prefixes) and a "Data Name".

A data name is exactly as it sounds, it's the name assigned to that particular data.

*(Note: names are caps-sensitive, so remember that when naming data.)*
>For example, lets say you're storing an username:
```javascript
const prefix = "SiteA";
let username = "Camryn";
```
>> This sets the prefix to be "SiteA" and the username to be "Camryn".

> Even though the variable is called "username" that doesn't mean the data is. You define the data name when you store the data.
> I'll go more in-depth on storing data in the next section.
```javascript
storeData(prefix, "Username", username);
```
>> This will store the data with the data name being set to "Username" and data being set to the variable "username".

The data structure ends up looking like this:
```
SiteA.Username = "Camryn"
```
Where "SiteA" is the prefix, "Username" is the data name, and "Camryn" is the data.

Usage
=====
The Local Storage API version 4, removes some old unnecessary methods, and reworks other methods. Any applications written using the old Local Storage API, will have to convert over. 

Storing Data
------------
The method for storing data is as followed:
```javascript
storeData(prefix, dataName, data);
```
> "Data" can be anything, and any object. Upon getting the data the API will try to automatically convert the data into it's original Object.

Lets use the previous example of storing usernames again:

```javascript
const prefix = "SiteA";
let users = ["Jeff", "Camryn", "Charles"];

storeData(prefix, "Usernames", users);
```
>> This will store the variable "users" with a data name of "Usernames".

Getting Data
------------
There are two methods for getting data. Each has their own usages in practical applications.

```javascript
getData(prefix, dataName, asArray);
```
>>> Where "asArray" is an optional boolean value determining if the data will be returned as an array.
>>> This is useful when you store the original data as an array.

> This will return the specific data entry and attempt to translate the data back to it's original type.
>> This can be used to get specific data.

```javascript
getAllData(prefix);
```

> This will return all any data stored to a specific prefix.
>> This can be used to get the total amount individual data entries exist to that prefix.

```javascript
getAllData(prefix).length;
```

>> A better example could be:

```javascript
const prefix = "SiteA";
let users = ["Jeff", "Camryn", "Charles"];

storeData(prefix, "usernames", users);
storeData(prefix, "current_user", "Shaun");

getAllData(prefix).length; // returns 2
```

Getting **all** data will return an array of the stored data.
```
(2) [Array(2), Array(2)]
  0: (2) ["SiteA.usernames", "Jeff,Camryn,Charles"]
  1: (2) ["SiteA.current_user", "Shaun"]
  length: 2
```
> _This is the output from Google Chrome's console._
>> _**Notice**: The array of strings ["Jeff","Camryn","Charles"] turned into one string; this is normal._

If you wanted to get the current user, using **getAllData()**, you'd do the following:
```javascript
getAllData(prefix)[1];
```
> This returns the array:
```
(2) ["SiteA.current_user", "Shaun"]
  0: "SiteA.current_user"
  1: "Shaun"
  length: 2
```
> _This is the output from Google Chrome's console._

Getting the actual name is done in a similar process:
```javascript
getAllData(prefix)[1][1];
```
> This returns "Shaun".
