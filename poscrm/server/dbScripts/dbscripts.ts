db.payments.drop();
db.createCollection("payments");
db.payments.insert(
    {
        "name":"Rajesh1","PaidTo":"SenthilKumar1","existingAmount":"30","NewAmount":"20","SubTotal":"",
        "area":"","address":"chennai 600020","primaryMobile":"9655289392","secondaryMobile":"9655289392","description":"this is desc",
        "createdby":"senthilKumar","createdOn":"29.07.2018 08:00","updatedby":"senthilkumar","updatedOn":"29.07.2018 00:00","status":true,
    }
);
db.payments.insert(
    {
        "name":"Rajesh2","PaidTo":"SenthilKumar2","existingAmount":"30","NewAmount":"20","SubTotal":"",
        "area":"","address":"chennai 600020","primaryMobile":"9655289392","secondaryMobile":"9655289392","description":"this is desc",
        "createdby":"senthilKumar","createdOn":"29.07.2018 08:00","updatedby":"senthilkumar","updatedOn":"29.07.2018 00:00","status":true,
    }
);
db.payments.insert(
    {
        "name":"Rajesh3","PaidTo":"SenthilKumar2","existingAmount":"20","NewAmount":"220","SubTotal":"",
        "area":"","address":"chennai 600020","primaryMobile":"9655289392","secondaryMobile":"9655289392","description":"this is desc",
        "createdby":"senthilKumar","createdOn":"29.07.2018 08:00","updatedby":"senthilkumar","updatedOn":"29.07.2018 00:00","status":true,
    }
);
db.payments.insert(
    {
        "name":"Rajesh4","PaidTo":"SenthilKumar2","existingAmount":"0","NewAmount":"220","SubTotal":"",
        "area":"","address":"chennai 600020","primaryMobile":"9655289392","secondaryMobile":"9655289392","description":"this is desc",
        "createdby":"senthilKumar","createdOn":"29.07.2018 08:00","updatedby":"senthilkumar","updatedOn":"29.07.2018 00:00","status":true,
    }
);
//https://stackblitz.com/edit/angular-6-jwt-authentication-example?file=app%2Flogin%2Flogin.component.ts
//http://jasonwatmore.com/post/2018/05/23/angular-6-jwt-authentication-example-tutorial
//https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3