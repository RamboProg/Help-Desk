//import ticket model from separate file
const Ticket = require('./ticketModel');

//close ticket
app.post("/api/v1/agent/tickets/close/:ticketId", async (req, res) => {
    try {
        const ticketId = parseInt(req.params.ticketId);
        const status = req.body.status;
        const resolutionDetails = req.body.resolutionDetails;

        // Find and update the ticket by its ID
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { $set: { status, resolutionDetails } },
            { new: true } // Return the updated document
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        return res.status(201).json(updatedTicket);
    } catch (e) {
        console.log("Could not close ticket", e.message);
        return res.status(400).send(e.message);
    }
});

















//----------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/api/v1/payment/subscription",
async (req, res) => {
    try {
        const creditCardNumber = req.body.creditCardNumber;
        const holderName = req.body.holderName;
        let payedAmount = req.body.payedAmount;
        const subType = req.body.subType;
        const zoneId = req.body.zoneId;
        const num_of_tickets = get_num_of_tickets(subType);
        const user = await getUser(req);
        const uid = user.userid;
        const existZone = await db.select("*").from("se_project.zones")
            .where({ id: zoneId });

        if (user.isSenior) {
            payedAmount = payedAmount * 0.9;
        }
        
        if (isEmpty(existZone)) {
            return res.status(400).send("Zone does not exist");
        } else if (creditCardNumber === null) {
            return res.status(400).send("you must entered creditCardNumber");
        } else if (holderName === null) {
            return res.status(400).send("you must enter the name of credit Card holder");
        } else if (payedAmount === null) {
            return res.status(400).send("you must enter the paid amount");
        } else if (subType != "annual" && subType != "month" && subType != "quarterly") {
            return res.status(400).send("you entered invalid subscription type you have only 3 types which are quarterly , month and annual");
        } else {

            const ret1 = await db('se_project.subscription').insert({
                subtype: subType,
                zoneid: zoneId,
                nooftickets: num_of_tickets,
                userid: uid
            }).returning("*");


            const id_trip = Number(ret1[0]["id"]).toString();

            const ret2 = await db('se_project.transactions').insert({
                amount: payedAmount,
                userid: uid,
                purchasedid: id_trip,
                purchasetype: "subscription"

            }).returning("*");


            const ret3 = await db('se_project.creditcarddetails').insert({
                holder_name: holderName,
                userid: uid,
                creditcardnumber: creditCardNumber


            }).returning("*");


            const ret = { num_of_tickets };//and add the pricecheck price ,upcome_rides
            return res.status(201).json(ret);

        }


    } catch (e) {
        console.log("Could not buy online subscription", e.message);
        return res.status(400).send(e.message);
    }
}
);
//POST pay for ticket online

app.put("/api/v1/password/reset",
 async (req, res) => {
     try {
         const pass = req.body.password;
         const user = await getUser(req);
         const id = user.userid;
         const old_pass = user.password;

         if (pass === old_pass) {
             return res.status(400).send("you are entering your old password");

         } else if (pass === "") {
             return res.status(400).send("you have to enter a value to the password");

         } else {

             await db('se_project.users').where('id', id).update({ password: pass });
             const user1 = await db.select("*").from('se_project.users').where('id', id);
             return res.status(201).json(user1);

         }
     } catch (e) {
         console.log("Could not change password", e.message);
         return res.status(400).send(e.message);
     }
 }
);