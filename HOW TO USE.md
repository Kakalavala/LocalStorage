### Prefixes
A prefix is used as a means to distinguish storage.
Best practice is to define the prefix at the beginning of the site's main script.
```
var prefix = "SiteA";
```
> For example, you have "SiteA" and "SiteB", you don't want the storage from SiteA, showing up in SiteB.


### Storing Data
**storeData(prefix, dataName, data)** is the method used to store data in the LocalStorage API.
> prefix = The prefix used. (Read "Prefixes" for more info regarding prefixes)
> dataName = What you'd like to call the data. (The LocalStorage structure is \<prefix>.\<dataName> = \<data>)
>> Lets say you wished to store some basic info, say a username.
```
var prefix = "SiteA";
var username = "ExampleName";

// prefix = SiteA, dataName = "Username", data = "ExampleName"
storeData(prefix, "Username", username);
```
>> It would structurally look like:
```
SiteA.Username = "ExampleName"
```

### Getting Data
Now that you can store data, retrieving it is just as important. You may retrieve any LocalStorage data you wish, as long as you know the prefix.

**getData(prefix, dataName)** will return the stored data, and will automatically convert the type to String, Boolean, or Number, based on its value.

You might of noticed, it won't auto do it for an Array. To get data as an array, simply use **getDataAsArray(prefix, dataName)**.
```
var prefix = "SiteB";
var usernames = ["Jeff", "Camryn", "Charles"];

storeData(prefix, "Usernames", usernames); // Store the data

if (dataExists(prefix, "Usernames")) {
  getData(prefix, "Usernames"); // Will return "Jeff,Camryn,Charles" as 1 string object.
  getDataAsArray(prefix, "Usernames"); // Will return an array: ["Jeff", "Camryn", "Charles"]
} else console.log("No data found by that name.");
```

### Checking if Data Exists
You cannot get data that doesn't exist. That's common sense.

**dataExists(prefix, dataName)** will return a boolean value (true if exists, false if doesn't exist)
```
var prefix = "SiteA";
var username = "Jeff";

storeData(prefix, "Username", username);

dataExists(prefix, "FooBar"); // Returns false as such data doesn't exist.
dataExists(prefix, "Username"); // Returns true as the data, "Username", exists.
```

### Removing Data
Storing data is useful, but so is removing data.

**removeData(prefix, dataName)** will remove the data if it exists.
```
var prefix = "SiteA";
var username = "Camryn";

removeData(prefix, "Username"); // Will do nothing as we've not stored "Username" yet!

storeData(prefix, "Username", username);

removeData(prefix, "Username"); // Will remove "Username"
```
