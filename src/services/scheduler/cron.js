import cron from "node-cron";
import fs from "fs";
import { format } from "date-fns";
import chalk from "chalk";

function backupCoupons() {
  try {
    const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const content = `Backup executado em: ${now}`;
    const dir = "backup";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const fileName = `${dir}/backup_${format(new Date(), "yyyyMMdd_HHmmss")}.txt`;
    fs.writeFileSync(fileName, content);

    console.log(chalk.green(`\n🕒 Backup gerado automaticamente: ${fileName}`));
  } catch (error) {
    console.log(chalk.red(`❌ Erro ao gerar backup: ${error.message}`));
  }
}

/**
 * @param {string} [cronTime="* * * * *"] - String padrão para agendar a cada minuto
 */
function startCron(cronTime = "* * * * *") {
  console.log(chalk.blue(`⏱️  Agendador de backups iniciado. Backup agendado para: "${cronTime}"`));
  console.log(chalk.gray("    (Pressione Ctrl+C para sair)"));

  cron.schedule(cronTime, () => {
    backupCoupons();
  });
}

export default startCron;
