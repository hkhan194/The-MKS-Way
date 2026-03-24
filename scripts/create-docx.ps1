Add-Type -AssemblyName System.IO.Compression.FileSystem

$templateRoot = Join-Path (Split-Path -Parent $PSScriptRoot) "templates"

$docs = @(
  @{
    Name = "Project Charter.docx"
    Title = "Project Charter"
    Body = @("Project name:", "Sponsor:", "Project manager:", "Purpose:", "Scope:", "Success measures:", "Key milestones:")
  },
  @{
    Name = "Data Privacy Assessment form.docx"
    Title = "Data Privacy Assessment Form"
    Body = @("Project name:", "Data involved:", "Data subjects:", "Retention approach:", "Risks and mitigations:")
  },
  @{
    Name = "Information Security Review form.docx"
    Title = "Information Security Review Form"
    Body = @("Project name:", "Systems impacted:", "Access model:", "Security controls:", "Open risks:")
  },
  @{
    Name = "Business Case template.docx"
    Title = "Business Case Template"
    Body = @("Problem statement:", "Proposed solution:", "Benefits:", "Costs:", "Recommendation:")
  },
  @{
    Name = "Risk Assessment template.docx"
    Title = "Risk Assessment Template"
    Body = @("Risk:", "Impact:", "Likelihood:", "Owner:", "Mitigation:")
  }
)

foreach ($doc in $docs) {
  $target = Join-Path $templateRoot $doc.Name
  if (Test-Path $target) {
    Remove-Item $target -Force
  }

  $tempDir = Join-Path $env:TEMP ([Guid]::NewGuid().ToString())
  New-Item -ItemType Directory -Path $tempDir | Out-Null
  New-Item -ItemType Directory -Path (Join-Path $tempDir "_rels") | Out-Null
  New-Item -ItemType Directory -Path (Join-Path $tempDir "docProps") | Out-Null
  New-Item -ItemType Directory -Path (Join-Path $tempDir "word") | Out-Null

  $contentTypes = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
"@

  $rels = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
"@

  $app = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex</Application>
</Properties>
"@

  $core = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <dc:title>$($doc.Title)</dc:title>
  <dc:creator>Codex</dc:creator>
</cp:coreProperties>
"@

  $paragraphs = ($doc.Body | ForEach-Object {
    "<w:p><w:r><w:t xml:space='preserve'>$_</w:t></w:r></w:p>"
  }) -join ""

  $document = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>$($doc.Title)</w:t></w:r></w:p>
    $paragraphs
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
    </w:sectPr>
  </w:body>
</w:document>
"@

  [IO.File]::WriteAllText((Join-Path $tempDir "[Content_Types].xml"), $contentTypes, [Text.UTF8Encoding]::new($false))
  [IO.File]::WriteAllText((Join-Path $tempDir "_rels\.rels"), $rels, [Text.UTF8Encoding]::new($false))
  [IO.File]::WriteAllText((Join-Path $tempDir "docProps\app.xml"), $app, [Text.UTF8Encoding]::new($false))
  [IO.File]::WriteAllText((Join-Path $tempDir "docProps\core.xml"), $core, [Text.UTF8Encoding]::new($false))
  [IO.File]::WriteAllText((Join-Path $tempDir "word\document.xml"), $document, [Text.UTF8Encoding]::new($false))

  [System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $target)
  Remove-Item $tempDir -Recurse -Force
}
