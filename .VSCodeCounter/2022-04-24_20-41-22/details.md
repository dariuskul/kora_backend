# Details

Date : 2022-04-24 20:41:22

Directory c:\Users\Darius\Desktop\Projects\everhoury\everhoury_backend

Total : 63 files,  16011 codes, 130 comments, 478 blanks, all 16619 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.eslintrc.json](/.eslintrc.json) | JSON with Comments | 0 | 0 | 1 | 1 |
| [.prettierrc.json](/.prettierrc.json) | JSON | 6 | 0 | 1 | 7 |
| [config.ts](/config.ts) | TypeScript | 16 | 0 | 9 | 25 |
| [constants/index.ts](/constants/index.ts) | TypeScript | 4 | 1 | 1 | 6 |
| [constants/project.ts](/constants/project.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [constants/status.ts](/constants/status.ts) | TypeScript | 6 | 1 | 1 | 8 |
| [constants/user.ts](/constants/user.ts) | TypeScript | 5 | 1 | 1 | 7 |
| [controllers/project.controller.ts](/controllers/project.controller.ts) | TypeScript | 57 | 0 | 7 | 64 |
| [controllers/report.controller.ts](/controllers/report.controller.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [controllers/task.controller.ts](/controllers/task.controller.ts) | TypeScript | 73 | 0 | 10 | 83 |
| [controllers/timer.controller.ts](/controllers/timer.controller.ts) | TypeScript | 48 | 1 | 8 | 57 |
| [controllers/user.controller.ts](/controllers/user.controller.ts) | TypeScript | 102 | 0 | 13 | 115 |
| [db/config.ts](/db/config.ts) | TypeScript | 3 | 0 | 3 | 6 |
| [db/dto/project.dto.js](/db/dto/project.dto.js) | JavaScript | 2 | 0 | 1 | 3 |
| [db/dto/project.dto.ts](/db/dto/project.dto.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [db/dto/task.dto.js](/db/dto/task.dto.js) | JavaScript | 2 | 0 | 1 | 3 |
| [db/dto/task.dto.ts](/db/dto/task.dto.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [db/dto/timer.dto.ts](/db/dto/timer.dto.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [db/dto/user.dto.js](/db/dto/user.dto.js) | JavaScript | 2 | 0 | 1 | 3 |
| [db/dto/user.dto.ts](/db/dto/user.dto.ts) | TypeScript | 17 | 0 | 4 | 21 |
| [db/index.ts](/db/index.ts) | TypeScript | 15 | 1 | 3 | 19 |
| [db/models/project.ts](/db/models/project.ts) | TypeScript | 37 | 0 | 11 | 48 |
| [db/models/task.ts](/db/models/task.ts) | TypeScript | 36 | 0 | 11 | 47 |
| [db/models/timer.ts](/db/models/timer.ts) | TypeScript | 34 | 0 | 12 | 46 |
| [db/models/user.ts](/db/models/user.ts) | TypeScript | 60 | 0 | 20 | 80 |
| [db/models/user_project.ts](/db/models/user_project.ts) | TypeScript | 16 | 0 | 8 | 24 |
| [index.ts](/index.ts) | TypeScript | 49 | 1 | 14 | 64 |
| [middlewares/authorize.ts](/middlewares/authorize.ts) | TypeScript | 30 | 0 | 2 | 32 |
| [others/templates/dailySummary.ts](/others/templates/dailySummary.ts) | TypeScript | 60 | 0 | 7 | 67 |
| [others/templates/email.ts](/others/templates/email.ts) | TypeScript | 21 | 0 | 8 | 29 |
| [others/templates/index.ts](/others/templates/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [others/templates/report.ts](/others/templates/report.ts) | TypeScript | 58 | 0 | 6 | 64 |
| [package-lock.json](/package-lock.json) | JSON | 13,471 | 0 | 1 | 13,472 |
| [package.json](/package.json) | JSON | 84 | 0 | 1 | 85 |
| [routes/index.ts](/routes/index.ts) | TypeScript | 13 | 0 | 4 | 17 |
| [routes/projects.ts](/routes/projects.ts) | TypeScript | 78 | 0 | 10 | 88 |
| [routes/reports.ts](/routes/reports.ts) | TypeScript | 26 | 1 | 4 | 31 |
| [routes/tasks.ts](/routes/tasks.ts) | TypeScript | 95 | 0 | 11 | 106 |
| [routes/timers.ts](/routes/timers.ts) | TypeScript | 90 | 0 | 12 | 102 |
| [routes/users.ts](/routes/users.ts) | TypeScript | 144 | 0 | 21 | 165 |
| [services/integrations/jira/jira.service.ts](/services/integrations/jira/jira.service.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [services/internal/eventSource.ts](/services/internal/eventSource.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [services/internal/scheduler.ts](/services/internal/scheduler.ts) | TypeScript | 52 | 4 | 8 | 64 |
| [services/project/project.service.ts](/services/project/project.service.ts) | TypeScript | 157 | 2 | 26 | 185 |
| [services/report/report.service.ts](/services/report/report.service.ts) | TypeScript | 31 | 1 | 2 | 34 |
| [services/shared.service.ts](/services/shared.service.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [services/task/task.service.ts](/services/task/task.service.ts) | TypeScript | 265 | 5 | 46 | 316 |
| [services/timer/timer.service.ts](/services/timer/timer.service.ts) | TypeScript | 152 | 1 | 24 | 177 |
| [services/user/user.service.ts](/services/user/user.service.ts) | TypeScript | 155 | 4 | 42 | 201 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 15 | 80 | 9 | 104 |
| [types.d.ts](/types.d.ts) | TypeScript | 8 | 0 | 0 | 8 |
| [types/error.ts](/types/error.ts) | TypeScript | 10 | 1 | 3 | 14 |
| [types/jira.ts](/types/jira.ts) | TypeScript | 30 | 0 | 4 | 34 |
| [utils/ReadableBuff.ts](/utils/ReadableBuff.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [utils/auth.ts](/utils/auth.ts) | TypeScript | 17 | 0 | 5 | 22 |
| [utils/email.ts](/utils/email.ts) | TypeScript | 17 | 0 | 5 | 22 |
| [utils/jira.ts](/utils/jira.ts) | TypeScript | 19 | 0 | 3 | 22 |
| [utils/messages/error.ts](/utils/messages/error.ts) | TypeScript | 3 | 1 | 2 | 6 |
| [utils/projects.ts](/utils/projects.ts) | TypeScript | 42 | 1 | 8 | 51 |
| [utils/report.ts](/utils/report.ts) | TypeScript | 75 | 5 | 14 | 94 |
| [utils/timer/index.ts](/utils/timer/index.ts) | TypeScript | 121 | 18 | 29 | 168 |
| [utils/user.ts](/utils/user.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [utils/validations/user.ts](/utils/validations/user.ts) | TypeScript | 8 | 0 | 3 | 11 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)