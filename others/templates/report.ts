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
          background-color: #04AA6D;
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
        </style>
     </head>
     <body>
     <h2 class="date-interval"> ${data.dateFrom} - ${data.dateUntil}</h2>
     <h3 class="pdf-title">Time report</h3>
     <div class="flex">
     ${data.projects.map(item => `
     <h1>Project: ${item.projectInfo.name}</h1>
      <table id="customers">
      <tr>
        <th>Task</th>
        <th>Time spent (HH:MM)</th>
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
