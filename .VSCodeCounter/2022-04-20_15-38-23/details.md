# Details

Date : 2022-04-20 15:38:23

Directory c:\Users\Darius\Desktop\Projects\everhoury\everhoury_backend

Total : 63 files,  15752 codes, 130 comments, 434 blanks, all 16316 lines

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
| [controllers/project.controller.ts](/controllers/project.controller.ts) | TypeScript | 48 | 0 | 6 | 54 |
| [controllers/report.controller.ts](/controllers/report.controller.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [controllers/task.controller.ts](/controllers/task.controller.ts) | TypeScript | 55 | 0 | 7 | 62 |
| [controllers/timer.controller.ts](/controllers/timer.controller.ts) | TypeScript | 48 | 1 | 8 | 57 |
| [controllers/user.controller.ts](/controllers/user.controller.ts) | TypeScript | 84 | 0 | 11 | 95 |
| [db/config.ts](/db/config.ts) | TypeScript | 3 | 0 | 3 | 6 |
| [db/dto/project.dto.js](/db/dto/project.dto.js) | JavaScript | 2 | 0 | 1 | 3 |
| [db/dto/project.dto.ts](/db/dto/project.dto.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [db/dto/task.dto.js](/db/dto/task.dto.js) | JavaScript | 2 | 0 | 1 | 3 |
| [db/dto/task.dto.ts](/db/dto/task.dto.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [db/dto/timer.dto.ts](/db/dto/timer.dto.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [db/dto/user.dto.js](/db/dto/user.dto.js) | JavaScript | 2 | 0 | 1 | 3 |
| [db/dto/user.dto.ts](/db/dto/user.dto.ts) | TypeScript | 17 | 0 | 4 | 21 |
| [db/index.ts](/db/index.ts) | TypeScript | 15 | 1 | 3 | 19 |
| [db/models/project.ts](/db/models/project.ts) | TypeScript | 37 | 0 | 11 | 48 |
| [db/models/task.ts](/db/models/task.ts) | TypeScript | 32 | 0 | 10 | 42 |
| [db/models/timer.ts](/db/models/timer.ts) | TypeScript | 34 | 0 | 12 | 46 |
| [db/models/user.ts](/db/models/user.ts) | TypeScript | 59 | 0 | 20 | 79 |
| [db/models/user_project.ts](/db/models/user_project.ts) | TypeScript | 16 | 0 | 8 | 24 |
| [index.ts](/index.ts) | TypeScript | 49 | 2 | 14 | 65 |
| [middlewares/authorize.ts](/middlewares/authorize.ts) | TypeScript | 30 | 0 | 2 | 32 |
| [others/templates/dailySummary.ts](/others/templates/dailySummary.ts) | TypeScript | 60 | 0 | 7 | 67 |
| [others/templates/email.ts](/others/templates/email.ts) | TypeScript | 17 | 0 | 5 | 22 |
| [others/templates/index.ts](/others/templates/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [others/templates/report.ts](/others/templates/report.ts) | TypeScript | 58 | 0 | 6 | 64 |
| [package-lock.json](/package-lock.json) | JSON | 13,471 | 0 | 1 | 13,472 |
| [package.json](/package.json) | JSON | 84 | 0 | 1 | 85 |
| [routes/index.ts](/routes/index.ts) | TypeScript | 13 | 0 | 4 | 17 |
| [routes/projects.ts](/routes/projects.ts) | TypeScript | 67 | 0 | 9 | 76 |
| [routes/reports.ts](/routes/reports.ts) | TypeScript | 26 | 1 | 4 | 31 |
| [routes/tasks.ts](/routes/tasks.ts) | TypeScript | 82 | 8 | 12 | 102 |
| [routes/timers.ts](/routes/timers.ts) | TypeScript | 90 | 0 | 12 | 102 |
| [routes/users.ts](/routes/users.ts) | TypeScript | 122 | 0 | 18 | 140 |
| [services/integrations/jira/jira.service.ts](/services/integrations/jira/jira.service.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [services/internal/eventSource.ts](/services/internal/eventSource.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [services/internal/scheduler.ts](/services/internal/scheduler.ts) | TypeScript | 53 | 14 | 10 | 77 |
| [services/project/project.service.ts](/services/project/project.service.ts) | TypeScript | 132 | 0 | 22 | 154 |
| [services/report/report.service.ts](/services/report/report.service.ts) | TypeScript | 31 | 1 | 2 | 34 |
| [services/shared.service.ts](/services/shared.service.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [services/task/task.service.ts](/services/task/task.service.ts) | TypeScript | 209 | 4 | 42 | 255 |
| [services/timer/timer.service.ts](/services/timer/timer.service.ts) | TypeScript | 151 | 1 | 24 | 176 |
| [services/user/user.service.ts](/services/user/user.service.ts) | TypeScript | 137 | 3 | 31 | 171 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 15 | 80 | 9 | 104 |
| [types.d.ts](/types.d.ts) | TypeScript | 8 | 0 | 0 | 8 |
| [types/error.ts](/types/error.ts) | TypeScript | 10 | 1 | 3 | 14 |
| [types/jira.ts](/types/jira.ts) | TypeScript | 30 | 0 | 4 | 34 |
| [utils/ReadableBuff.ts](/utils/ReadableBuff.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [utils/auth.ts](/utils/auth.ts) | TypeScript | 17 | 0 | 5 | 22 |
| [utils/email.ts](/utils/email.ts) | TypeScript | 17 | 0 | 5 | 22 |
| [utils/jira.ts](/utils/jira.ts) | TypeScript | 19 | 0 | 3 | 22 |
| [utils/messages/error.ts](/utils/messages/error.ts) | TypeScript | 3 | 1 | 2 | 6 |
| [utils/projects.ts](/utils/projects.ts) | TypeScript | 35 | 0 | 7 | 42 |
| [utils/report.ts](/utils/report.ts) | TypeScript | 76 | 5 | 14 | 95 |
| [utils/timer/index.ts](/utils/timer/index.ts) | TypeScript | 74 | 4 | 17 | 95 |
| [utils/user.ts](/utils/user.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [utils/validations/user.ts](/utils/validations/user.ts) | TypeScript | 8 | 0 | 3 | 11 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)