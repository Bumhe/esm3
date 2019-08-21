nodeMailer = require('nodemailer');

module.exports.sendMail=function(req,res){

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'tombumhe@gmail.com',
            pass: '5ecure@dm1n'
        }
    });
    let mailOptions = {
        from: '"Tom Bumhe" <tombumhe@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(req.body, (error, info) => {
        if (error) {
             console.log(error);
             return  res.status('401').json({err: info});
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        return res.status('200').json({success: true});
        });

}