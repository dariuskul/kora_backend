# Diff Details

Date : 2022-05-08 12:30:36

Directory c:\Users\Darius\Desktop\Projects\everhoury\everhoury_backend

Total : 107 files,  24536 codes, 49 comments, 1124 blanks, all 25709 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [__tests__/client/client.test.ts](/__tests__/client/client.test.ts) | TypeScript | 86 | 2 | 4 | 92 |
| [__tests__/project/project.test.ts](/__tests__/project/project.test.ts) | TypeScript | 68 | 0 | 3 | 71 |
| [__tests__/task/task.test.ts](/__tests__/task/task.test.ts) | TypeScript | 59 | 2 | 3 | 64 |
| [__tests__/timer/timer.test.ts](/__tests__/timer/timer.test.ts) | TypeScript | 44 | 2 | 2 | 48 |
| [__tests__/user/user.test.ts](/__tests__/user/user.test.ts) | TypeScript | 65 | 0 | 5 | 70 |
| [config/config.json](/config/config.json) | JSON | 23 | 0 | 1 | 24 |
| [controllers/client.controller.ts](/controllers/client.controller.ts) | TypeScript | 57 | 1 | 11 | 69 |
| [controllers/report.controller.ts](/controllers/report.controller.ts) | TypeScript | 10 | 0 | 1 | 11 |
| [coverage/clover.xml](/coverage/clover.xml) | XML | 1,803 | 0 | 1 | 1,804 |
| [coverage/coverage-final.json](/coverage/coverage-final.json) | JSON | 48 | 0 | 1 | 49 |
| [coverage/lcov-report/base.css](/coverage/lcov-report/base.css) | CSS | 203 | 9 | 13 | 225 |
| [coverage/lcov-report/block-navigation.js](/coverage/lcov-report/block-navigation.js) | JavaScript | 66 | 7 | 15 | 88 |
| [coverage/lcov-report/everhoury_backend/config.ts.html](/coverage/lcov-report/everhoury_backend/config.ts.html) | HTML | 143 | 0 | 14 | 157 |
| [coverage/lcov-report/everhoury_backend/constants/index.html](/coverage/lcov-report/everhoury_backend/constants/index.html) | HTML | 116 | 0 | 15 | 131 |
| [coverage/lcov-report/everhoury_backend/constants/project.ts.html](/coverage/lcov-report/everhoury_backend/constants/project.ts.html) | HTML | 83 | 0 | 14 | 97 |
| [coverage/lcov-report/everhoury_backend/constants/status.ts.html](/coverage/lcov-report/everhoury_backend/constants/status.ts.html) | HTML | 92 | 0 | 14 | 106 |
| [coverage/lcov-report/everhoury_backend/controllers/client.controller.ts.html](/coverage/lcov-report/everhoury_backend/controllers/client.controller.ts.html) | HTML | 275 | 0 | 14 | 289 |
| [coverage/lcov-report/everhoury_backend/controllers/index.html](/coverage/lcov-report/everhoury_backend/controllers/index.html) | HTML | 172 | 0 | 19 | 191 |
| [coverage/lcov-report/everhoury_backend/controllers/project.controller.ts.html](/coverage/lcov-report/everhoury_backend/controllers/project.controller.ts.html) | HTML | 260 | 0 | 14 | 274 |
| [coverage/lcov-report/everhoury_backend/controllers/report.controller.ts.html](/coverage/lcov-report/everhoury_backend/controllers/report.controller.ts.html) | HTML | 137 | 0 | 14 | 151 |
| [coverage/lcov-report/everhoury_backend/controllers/task.controller.ts.html](/coverage/lcov-report/everhoury_backend/controllers/task.controller.ts.html) | HTML | 317 | 0 | 14 | 331 |
| [coverage/lcov-report/everhoury_backend/controllers/timer.controller.ts.html](/coverage/lcov-report/everhoury_backend/controllers/timer.controller.ts.html) | HTML | 239 | 0 | 14 | 253 |
| [coverage/lcov-report/everhoury_backend/controllers/user.controller.ts.html](/coverage/lcov-report/everhoury_backend/controllers/user.controller.ts.html) | HTML | 413 | 0 | 14 | 427 |
| [coverage/lcov-report/everhoury_backend/db/config.ts.html](/coverage/lcov-report/everhoury_backend/db/config.ts.html) | HTML | 110 | 0 | 14 | 124 |
| [coverage/lcov-report/everhoury_backend/db/index.html](/coverage/lcov-report/everhoury_backend/db/index.html) | HTML | 116 | 0 | 15 | 131 |
| [coverage/lcov-report/everhoury_backend/db/index.ts.html](/coverage/lcov-report/everhoury_backend/db/index.ts.html) | HTML | 125 | 0 | 14 | 139 |
| [coverage/lcov-report/everhoury_backend/db/models/client.ts.html](/coverage/lcov-report/everhoury_backend/db/models/client.ts.html) | HTML | 140 | 0 | 14 | 154 |
| [coverage/lcov-report/everhoury_backend/db/models/index.html](/coverage/lcov-report/everhoury_backend/db/models/index.html) | HTML | 172 | 0 | 19 | 191 |
| [coverage/lcov-report/everhoury_backend/db/models/project.ts.html](/coverage/lcov-report/everhoury_backend/db/models/project.ts.html) | HTML | 236 | 0 | 14 | 250 |
| [coverage/lcov-report/everhoury_backend/db/models/task.ts.html](/coverage/lcov-report/everhoury_backend/db/models/task.ts.html) | HTML | 209 | 0 | 14 | 223 |
| [coverage/lcov-report/everhoury_backend/db/models/timer.ts.html](/coverage/lcov-report/everhoury_backend/db/models/timer.ts.html) | HTML | 206 | 0 | 14 | 220 |
| [coverage/lcov-report/everhoury_backend/db/models/user.ts.html](/coverage/lcov-report/everhoury_backend/db/models/user.ts.html) | HTML | 308 | 0 | 14 | 322 |
| [coverage/lcov-report/everhoury_backend/db/models/user_project.ts.html](/coverage/lcov-report/everhoury_backend/db/models/user_project.ts.html) | HTML | 140 | 0 | 14 | 154 |
| [coverage/lcov-report/everhoury_backend/index.html](/coverage/lcov-report/everhoury_backend/index.html) | HTML | 116 | 0 | 15 | 131 |
| [coverage/lcov-report/everhoury_backend/index.ts.html](/coverage/lcov-report/everhoury_backend/index.ts.html) | HTML | 269 | 0 | 14 | 283 |
| [coverage/lcov-report/everhoury_backend/middlewares/authorize.ts.html](/coverage/lcov-report/everhoury_backend/middlewares/authorize.ts.html) | HTML | 164 | 0 | 14 | 178 |
| [coverage/lcov-report/everhoury_backend/middlewares/index.html](/coverage/lcov-report/everhoury_backend/middlewares/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/others/templates/dailySummary.ts.html](/coverage/lcov-report/everhoury_backend/others/templates/dailySummary.ts.html) | HTML | 265 | 0 | 18 | 283 |
| [coverage/lcov-report/everhoury_backend/others/templates/email.ts.html](/coverage/lcov-report/everhoury_backend/others/templates/email.ts.html) | HTML | 155 | 0 | 14 | 169 |
| [coverage/lcov-report/everhoury_backend/others/templates/index.html](/coverage/lcov-report/everhoury_backend/others/templates/index.html) | HTML | 144 | 0 | 17 | 161 |
| [coverage/lcov-report/everhoury_backend/others/templates/index.ts.html](/coverage/lcov-report/everhoury_backend/others/templates/index.ts.html) | HTML | 74 | 0 | 14 | 88 |
| [coverage/lcov-report/everhoury_backend/others/templates/report.ts.html](/coverage/lcov-report/everhoury_backend/others/templates/report.ts.html) | HTML | 309 | 0 | 16 | 325 |
| [coverage/lcov-report/everhoury_backend/routes/client.ts.html](/coverage/lcov-report/everhoury_backend/routes/client.ts.html) | HTML | 335 | 0 | 14 | 349 |
| [coverage/lcov-report/everhoury_backend/routes/index.html](/coverage/lcov-report/everhoury_backend/routes/index.html) | HTML | 186 | 0 | 20 | 206 |
| [coverage/lcov-report/everhoury_backend/routes/index.ts.html](/coverage/lcov-report/everhoury_backend/routes/index.ts.html) | HTML | 125 | 0 | 14 | 139 |
| [coverage/lcov-report/everhoury_backend/routes/projects.ts.html](/coverage/lcov-report/everhoury_backend/routes/projects.ts.html) | HTML | 332 | 0 | 14 | 346 |
| [coverage/lcov-report/everhoury_backend/routes/reports.ts.html](/coverage/lcov-report/everhoury_backend/routes/reports.ts.html) | HTML | 200 | 0 | 14 | 214 |
| [coverage/lcov-report/everhoury_backend/routes/tasks.ts.html](/coverage/lcov-report/everhoury_backend/routes/tasks.ts.html) | HTML | 431 | 0 | 14 | 445 |
| [coverage/lcov-report/everhoury_backend/routes/timers.ts.html](/coverage/lcov-report/everhoury_backend/routes/timers.ts.html) | HTML | 374 | 0 | 14 | 388 |
| [coverage/lcov-report/everhoury_backend/routes/users.ts.html](/coverage/lcov-report/everhoury_backend/routes/users.ts.html) | HTML | 563 | 0 | 14 | 577 |
| [coverage/lcov-report/everhoury_backend/services/client/client.service.ts.html](/coverage/lcov-report/everhoury_backend/services/client/client.service.ts.html) | HTML | 362 | 0 | 14 | 376 |
| [coverage/lcov-report/everhoury_backend/services/client/index.html](/coverage/lcov-report/everhoury_backend/services/client/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/services/integrations/jira/index.html](/coverage/lcov-report/everhoury_backend/services/integrations/jira/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/services/integrations/jira/jira.service.ts.html](/coverage/lcov-report/everhoury_backend/services/integrations/jira/jira.service.ts.html) | HTML | 107 | 0 | 14 | 121 |
| [coverage/lcov-report/everhoury_backend/services/internal/eventSource.ts.html](/coverage/lcov-report/everhoury_backend/services/internal/eventSource.ts.html) | HTML | 86 | 0 | 14 | 100 |
| [coverage/lcov-report/everhoury_backend/services/internal/index.html](/coverage/lcov-report/everhoury_backend/services/internal/index.html) | HTML | 116 | 0 | 15 | 131 |
| [coverage/lcov-report/everhoury_backend/services/internal/scheduler.ts.html](/coverage/lcov-report/everhoury_backend/services/internal/scheduler.ts.html) | HTML | 374 | 0 | 14 | 388 |
| [coverage/lcov-report/everhoury_backend/services/project/index.html](/coverage/lcov-report/everhoury_backend/services/project/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/services/project/project.service.ts.html](/coverage/lcov-report/everhoury_backend/services/project/project.service.ts.html) | HTML | 722 | 0 | 14 | 736 |
| [coverage/lcov-report/everhoury_backend/services/report/index.html](/coverage/lcov-report/everhoury_backend/services/report/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/services/report/report.service.ts.html](/coverage/lcov-report/everhoury_backend/services/report/report.service.ts.html) | HTML | 251 | 0 | 14 | 265 |
| [coverage/lcov-report/everhoury_backend/services/task/index.html](/coverage/lcov-report/everhoury_backend/services/task/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/services/task/task.service.ts.html](/coverage/lcov-report/everhoury_backend/services/task/task.service.ts.html) | HTML | 1,013 | 0 | 14 | 1,027 |
| [coverage/lcov-report/everhoury_backend/services/timer/index.html](/coverage/lcov-report/everhoury_backend/services/timer/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/services/timer/timer.service.ts.html](/coverage/lcov-report/everhoury_backend/services/timer/timer.service.ts.html) | HTML | 596 | 0 | 14 | 610 |
| [coverage/lcov-report/everhoury_backend/services/user/index.html](/coverage/lcov-report/everhoury_backend/services/user/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/services/user/user.service.ts.html](/coverage/lcov-report/everhoury_backend/services/user/user.service.ts.html) | HTML | 674 | 0 | 14 | 688 |
| [coverage/lcov-report/everhoury_backend/types/error.ts.html](/coverage/lcov-report/everhoury_backend/types/error.ts.html) | HTML | 110 | 0 | 14 | 124 |
| [coverage/lcov-report/everhoury_backend/types/index.html](/coverage/lcov-report/everhoury_backend/types/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/utils/auth.ts.html](/coverage/lcov-report/everhoury_backend/utils/auth.ts.html) | HTML | 134 | 0 | 14 | 148 |
| [coverage/lcov-report/everhoury_backend/utils/email.ts.html](/coverage/lcov-report/everhoury_backend/utils/email.ts.html) | HTML | 134 | 0 | 14 | 148 |
| [coverage/lcov-report/everhoury_backend/utils/index.html](/coverage/lcov-report/everhoury_backend/utils/index.html) | HTML | 172 | 0 | 19 | 191 |
| [coverage/lcov-report/everhoury_backend/utils/jira.ts.html](/coverage/lcov-report/everhoury_backend/utils/jira.ts.html) | HTML | 134 | 0 | 14 | 148 |
| [coverage/lcov-report/everhoury_backend/utils/projects.ts.html](/coverage/lcov-report/everhoury_backend/utils/projects.ts.html) | HTML | 224 | 0 | 14 | 238 |
| [coverage/lcov-report/everhoury_backend/utils/report.ts.html](/coverage/lcov-report/everhoury_backend/utils/report.ts.html) | HTML | 350 | 0 | 14 | 364 |
| [coverage/lcov-report/everhoury_backend/utils/timer/index.html](/coverage/lcov-report/everhoury_backend/utils/timer/index.html) | HTML | 102 | 0 | 14 | 116 |
| [coverage/lcov-report/everhoury_backend/utils/timer/index.ts.html](/coverage/lcov-report/everhoury_backend/utils/timer/index.ts.html) | HTML | 644 | 0 | 14 | 658 |
| [coverage/lcov-report/everhoury_backend/utils/user.ts.html](/coverage/lcov-report/everhoury_backend/utils/user.ts.html) | HTML | 80 | 0 | 14 | 94 |
| [coverage/lcov-report/index.html](/coverage/lcov-report/index.html) | HTML | 354 | 0 | 32 | 386 |
| [coverage/lcov-report/prettify.css](/coverage/lcov-report/prettify.css) | CSS | 1 | 0 | 1 | 2 |
| [coverage/lcov-report/prettify.js](/coverage/lcov-report/prettify.js) | JavaScript | 1 | 1 | 1 | 3 |
| [coverage/lcov-report/sorter.js](/coverage/lcov-report/sorter.js) | JavaScript | 165 | 17 | 15 | 197 |
| [db/config.ts](/db/config.ts) | TypeScript | 8 | 0 | 0 | 8 |
| [db/dto/client.dto.ts](/db/dto/client.dto.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [db/dto/project.dto.ts](/db/dto/project.dto.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [db/models/client.ts](/db/models/client.ts) | TypeScript | 18 | 0 | 6 | 24 |
| [db/models/models.js](/db/models/models.js) | JavaScript | 30 | 0 | 7 | 37 |
| [db/models/project.ts](/db/models/project.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [index.ts](/index.ts) | TypeScript | 1 | 1 | 1 | 3 |
| [others/templates/report.ts](/others/templates/report.ts) | TypeScript | 19 | 0 | -2 | 17 |
| [package-lock.json](/package-lock.json) | JSON | 5,722 | 0 | 0 | 5,722 |
| [package.json](/package.json) | JSON | 26 | 0 | 0 | 26 |
| [routes/client.ts](/routes/client.ts) | TypeScript | 81 | 0 | 8 | 89 |
| [routes/index.ts](/routes/index.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [routes/reports.ts](/routes/reports.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [routes/tasks.ts](/routes/tasks.ts) | TypeScript | 12 | 0 | 3 | 15 |
| [routes/users.ts](/routes/users.ts) | TypeScript | 1 | 0 | -1 | 0 |
| [services/client/client.service.ts](/services/client/client.service.ts) | TypeScript | 79 | 0 | 19 | 98 |
| [services/internal/scheduler.ts](/services/internal/scheduler.ts) | TypeScript | 31 | 4 | 3 | 38 |
| [services/project/project.service.ts](/services/project/project.service.ts) | TypeScript | 28 | 1 | 4 | 33 |
| [services/report/report.service.ts](/services/report/report.service.ts) | TypeScript | 24 | 1 | 2 | 27 |
| [services/task/task.service.ts](/services/task/task.service.ts) | TypeScript | -1 | 0 | 0 | -1 |
| [services/timer/timer.service.ts](/services/timer/timer.service.ts) | TypeScript | -1 | 0 | 0 | -1 |
| [services/user/user.service.ts](/services/user/user.service.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [types/filters.ts](/types/filters.ts) | TypeScript | 6 | 0 | 0 | 6 |
| [utils/projects.ts](/utils/projects.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [utils/timer/index.ts](/utils/timer/index.ts) | TypeScript | 20 | 1 | 3 | 24 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details