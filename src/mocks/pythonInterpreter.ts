class PythonInterpreter {
    private variables: Map<string, any>;
    private output: string[];
    private indentationLevel: number;
  
    constructor() {
      this.variables = new Map();
      this.output = [];
      this.indentationLevel = 0;
    }
  
    private handlePrint(args: string) {
      // Обработка f-строк
      if (args.startsWith('f"') || args.startsWith("f'")) {
        const template = args.slice(2, -1);
        const result = template.replace(/\{([^}]+)\}/g, (_, expr) => {
          return String(this.evaluateExpression(expr.trim()));
        });
        this.output.push(result);
        return;
      }
  
      const value = this.evaluateExpression(args);
      this.output.push(String(value));
    }
  
    private evaluateExpression(expr: string): any {
      try {
        expr = expr.replace(/and/g, '&&')
                 .replace(/or/g, '||')
                 .replace(/not/g, '!')
                 .replace(/True/g, 'true')
                 .replace(/False/g, 'false')
                 .replace(/None/g, 'null');
  
        for (const [name, value] of this.variables.entries()) {
          const regex = new RegExp(`\\b${name}\\b`, 'g');
          if (typeof value === 'string') {
            expr = expr.replace(regex, `"${value}"`);
          } else {
            expr = expr.replace(regex, String(value));
          }
        }
  
        return eval(expr);
      } catch (error) {
        throw new Error(`Invalid expression: ${expr}`);
      }
    }
  
    private handleAssignment(line: string) {
      const [left, ...rightParts] = line.split('=');
      const right = rightParts.join('=').trim();
      const varName = left.trim();
  
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
        throw new Error(`Invalid variable name: ${varName}`);
      }
  
      let value: any;
  
      if (right.startsWith('"') || right.startsWith("'")) {
        value = right.slice(1, -1);
      }
      else if (right.startsWith('[') && right.endsWith(']')) {
        value = JSON.parse(right.replace(/'/g, '"'));
      }
      else {
        value = this.evaluateExpression(right);
      }
  
      this.variables.set(varName, value);
    }
  
    execute(code: string): { output: string; error?: string } {
      this.variables.clear();
      this.output = [];
      
      try {
        const lines = code.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line || line.startsWith('#')) continue;
  
          if (line.startsWith('print(')) {
            const match = line.match(/print\((.*)\)/);
            if (match) {
              this.handlePrint(match[1]);
            }
            continue;
          }
  
          if (line.includes('=') && !line.includes('==')) {
            this.handleAssignment(line);
            continue;
          }
  
          if (line.startsWith('if ')) {
            const condition = line.slice(3, -1);
            if (!this.evaluateExpression(condition)) {
              while (i < lines.length && lines[i + 1]?.startsWith('    ')) {
                i++;
              }
            }
            continue;
          }
  
          // Выполнение выражения
          const result = this.evaluateExpression(line);
          if (result !== undefined) {
            this.output.push(String(result));
          }
        }
  
        return {
          output: this.output.join('\n') || 'No output'
        };
      } catch (error) {
        return {
          output: '',
          error: error instanceof Error ? error.message : 'Execution error'
        };
      }
    }
  }
  
  export { PythonInterpreter };