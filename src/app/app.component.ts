import { Component, AfterViewInit } from '@angular/core';

declare var NiraAPI: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'mock-api-project';

  ngAfterViewInit(): void {
    this.initNiraViewer();
  }

  private initNiraViewer(): void {
    if (typeof NiraAPI === 'undefined' || !NiraAPI.Viewer) {
      console.warn("⚠️ NiraAPI is not available. Skipping initialization.");
      return;
    }

    try {
      const viewer = new NiraAPI.Viewer(document.getElementById('niraviewer'));

      viewer.on('asset_load_finish', () => {
        console.log("✅ Nira Viewer: Asset loaded successfully");
        viewer.setToolMode(NiraAPI.Toolmode.Orbit);
      });

      viewer.on('error', (error: any) => {
        console.error("❌ Nira Viewer Error:", error);
      });

    } catch (error) {
      console.error("❌ Failed to initialize Nira Viewer:", error);
    }
  }
}
