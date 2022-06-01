import moment from 'moment';

interface IDailySummary {
  totalTimeTracked: string;
  projects: any;
}

export const dailySummary = (data: IDailySummary) => {
  const today = new Date();
  return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
        #customers {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        #customers td, #customers th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        
        #customers tr:nth-child(even){background-color: #f2f2f2;}
        
        #customers tr:hover {background-color: #ddd;}
        
        #customers th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #04AA6D;
          color: white;
        }
        .flex {
        }
        </style>
     </head>
     <body>
     <h1>Total time spent ${data.totalTimeTracked}h </h1>
     <div class="flex">
     <table id="customers">
     <tr>
     <th>Project</th>
     <th>Time spent (HH:MM)</th>
     </tr>
     ${data.projects.map(
    (item) => `
     ${item &&
      `<tr>
     <td>${item.projectInfo.name}</td>
     <td>${item.projectInfo.totalProjectTime}</td>
   </tr>`
      }
  `
  ).join(' ')}
  </table>
     </body>
  </html>
  `;
};
