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
    // Initialize the Nira 3D viewer when the page loads
    this.initNiraViewer();
  }

  private initNiraViewer(): void {
    try {
      const viewer = new (window as any).NiraAPI.Viewer(document.getElementById('niraviewer'));

      viewer.on('asset_load_finish', () => {
        console.log("✅ Nira Viewer: Asset loaded successfully");
        viewer.setToolMode((window as any).NiraAPI.Toolmode.Orbit);

        // Remove the play button when iframe loads
        const iframe = document.getElementById('niraviewer') as HTMLIFrameElement;
        if (iframe) {
          iframe.contentWindow?.postMessage({ type: 'startPlayback' }, '*');
        }
      });

      viewer.on('error', (error: any) => {
        console.error("❌ Nira Viewer Error:", error);
      });
    } catch (error) {
      console.error("❌ Failed to initialize Nira Viewer:", error);
    }
  }
}
