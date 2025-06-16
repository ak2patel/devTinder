const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress, subject, html, text) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
     
      Body: {
  
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
        Text: {
          Charset: "UTF-8",
          Data: text,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: ["akpate100601@gmail.com"],
  });
};

const run = async (to ,from, subject, html, text) => {
  const sendEmailCommand = createSendEmailCommand(to ,from, subject, html, text);

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports= { run };
