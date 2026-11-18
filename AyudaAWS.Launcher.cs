using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Windows.Forms;
using Microsoft.Web.WebView2.WinForms;

namespace AyudaAWS;

internal static class Program
{
    [STAThread]
    private static void Main()
    {
        try
        {
            var pagePath = ExtractSite();
            ApplicationConfiguration.Initialize();
            Application.Run(new CourseWindow(pagePath));
        }
        catch (Exception error)
        {
            MessageBox.Show(
                "No se pudo abrir AWS Academy Cloud Foundations.\n\n" + error.Message,
                "AyudaAWS",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
        }
    }

    private static string ExtractSite()
    {
        var siteDirectory = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "AyudaAWS",
            "Site");
        var assembly = Assembly.GetExecutingAssembly();

        foreach (var resourceName in assembly.GetManifestResourceNames())
        {
            if (!resourceName.StartsWith("site/", StringComparison.Ordinal))
                continue;

            var relativePath = resourceName["site/".Length..]
                .Replace('/', Path.DirectorySeparatorChar);
            var destination = Path.Combine(siteDirectory, relativePath);
            Directory.CreateDirectory(Path.GetDirectoryName(destination)!);

            using var resource = assembly.GetManifestResourceStream(resourceName)
                ?? throw new InvalidOperationException($"No se pudo leer {resourceName}.");
            using var output = File.Create(destination);
            resource.CopyTo(output);
        }

        return Path.Combine(siteDirectory, "index.html");
    }
}

internal sealed class CourseWindow : Form
{
    private readonly WebView2 _browser = new();
    private readonly string _pagePath;

    public CourseWindow(string pagePath)
    {
        _pagePath = pagePath;
        Text = "AWS Academy Cloud Foundations";
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(800, 600);
        ClientSize = new Size(1360, 900);
        Icon = System.Drawing.Icon.ExtractAssociatedIcon(Application.ExecutablePath)
            ?? System.Drawing.SystemIcons.Application;

        _browser.Dock = DockStyle.Fill;
        Controls.Add(_browser);
        Load += LoadCourse;
    }

    private async void LoadCourse(object? sender, EventArgs e)
    {
        try
        {
            await _browser.EnsureCoreWebView2Async();
            _browser.CoreWebView2.Settings.AreDevToolsEnabled = false;
            _browser.CoreWebView2.NewWindowRequested += (_, args) =>
            {
                args.Handled = true;
                Process.Start(new ProcessStartInfo(args.Uri) { UseShellExecute = true });
            };
            _browser.Source = new Uri(_pagePath);
        }
        catch (Exception error)
        {
            MessageBox.Show(
                "No se pudo iniciar el navegador integrado. Instala Microsoft Edge WebView2 Runtime e inténtalo de nuevo.\n\n" + error.Message,
                "AyudaAWS",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
            Close();
        }
    }
}