import moment from "moment";

export const template = ({ data }) => {
  const today = new Date();
  return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
        #customers {
          font-family: OfficinaSans Cyr;
          border-collapse: collapse;
          width: 100%;
          border-radius: 4px;
        }
        
        #customers td, #customers th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        
        #customers th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #6D6D64;
          color: white;
        }
        .flex {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .date-interval {
          text-align: right;
          font-size: 20px;
        }
        .pdf-title {
          text-align: center;
          font-size: 30px;
        }
        .total-project-time {
          text-align: left;
          margin-top: 10px;
          font-size: 16px;
        }
        .total {
          font-weight: 700;
        }
        .flex-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .image {
          max-width: 50px;
        }
        </style>
     </head>
     <body>
     <div class="flex-title">
     <img class="image" alt="" src="data:image/jpg;base64,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" />
     <h2 class="date-interval"> ${data.dateFrom} - ${data.dateUntil}</h2>
     </div>
     <h3 class="pdf-title">Time report</h3>
     <div class="flex">
     ${data.projects.map(item => `
     <h1>Project: ${item.projectInfo.name}</h1>
      <table id="customers">
      <tr>
        <th>Task</th>
        <th>Time spent (HH:MM:SS)</th>
      </tr>
      ${item.projectInfo.tasks.map(task => `
      <tr>
        <td>${task.taskInfo.name}</td>
        <td>${task.taskInfo.totalTaskTime}</td>
      </tr>
      `).join('')}
      <tr>
      <td class="total">Total</td>
      <td class="total">${(item.projectInfo.totalProjectTime)} </td>
    </tr>
      </table>
  `)}
     </body>
  </html>
  `;
};
