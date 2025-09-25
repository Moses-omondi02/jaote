# backend/test_imports.py
import unittest
import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

class TestImports(unittest.TestCase):
    def test_import_app(self):
        """Test that main app modules can be imported"""
        try:
            from backend import app, models, config
            self.assertTrue(True)
        except ImportError as e:
            self.fail(f"Import failed: {e}")

if __name__ == '__main__':
    unittest.main()