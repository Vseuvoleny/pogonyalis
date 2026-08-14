import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = app.get(ConfigService);
  const PORT = config.get("PORT") || 4000;
  await app.listen(PORT);
  console.log(`API is running on http://localhost:${PORT}`);
}

bootstrap();
