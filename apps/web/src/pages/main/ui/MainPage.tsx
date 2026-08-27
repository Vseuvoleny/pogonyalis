import { sharedText } from "@pogonyalis/ui";

export function MainPage() {
  return (
    <section className="intro-section" aria-labelledby="main-title">
      <p className="eyebrow">Sailing debrief journal</p>
      <h1 id="main-title">Pogonyalis</h1>
      <p className="lead">
        Дневник тренировок и гонок: условия, соперники, настройки яхты и
        выводы после выхода на воду.
      </p>
      <p className="shared-note">{sharedText}</p>
    </section>
  );
}
