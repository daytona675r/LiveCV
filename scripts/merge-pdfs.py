"""Merge local application documents in the supplied order, without overwriting."""
import argparse
from pathlib import Path
from pypdf import PdfReader, PdfWriter

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', required=True, type=Path)
parser.add_argument('inputs', nargs='+', type=Path)
args = parser.parse_args()
destination = args.output.resolve()
if destination.exists():
    parser.error('Output already exists; choose a new filename.')
writer = PdfWriter()
for source in args.inputs:
    source = source.resolve(strict=True)
    if source == destination:
        parser.error('Output must differ from every input.')
    reader = PdfReader(source)
    if reader.is_encrypted:
        parser.error('Encrypted inputs must be unlocked locally first.')
    writer.append(reader)
destination.parent.mkdir(parents=True, exist_ok=True)
with destination.open('xb') as stream:
    writer.write(stream)
print(destination)
