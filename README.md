# Design Patterns 실습 (Vue + TypeScript)

Vue 3 + TypeScript로 구현한 인터랙티브 실습 페이지입니다.

| 패턴 | 분류 | 경로 |
| --- | --- | --- |
| Prototype | 생성(Creational) | `/prototype` |
| Flyweight | 구조(Structural) | `/flyweight` |
| Mediator | 행위(Behavioral) | `/mediator` |

메인 페이지(`/`)에는 패턴 개요와 빠른 이동 버튼이 있고, 
상세 페이지로 넘어가면 각 패턴에 대한 설명과 실습용 UI가 있습니다.

## 주요 기능

- **Prototype Playground**: 기본 브리프를 복제한 뒤 원하는 필드만 덮어써 변화 과정을 비교.
- **Flyweight Icon Cache**: 공유 아이콘 캐시와 외적 상태를 분리해 캐시 히트/미스를 시각화.
- **Mediator Launch Hub**: 팀별 Sync를 허브가 중재하며 라우팅 로그를 타임라인으로 표시.
- **Vue Router 기반 네비게이션**: 홈 허브와 패턴 페이지를 명확히 분리.
- **Type-safe 패턴 모듈**: `src/patterns/*.ts`에 비즈니스 로직을 모듈화하여 재사용.



## 디렉터리 구조

```
src/
 ├─ components/
 │   ├─ PrototypeDemo.vue
 │   ├─ FlyweightDemo.vue
 │   └─ MediatorDemo.vue
 ├─ patterns/
 │   ├─ prototype.ts
 │   ├─ flyweight.ts
 │   └─ mediator.ts
 ├─ views/
 │   ├─ HomeView.vue
 │   ├─ PrototypeView.vue
 │   ├─ FlyweightView.vue
 │   └─ MediatorView.vue
 └─ router/
     └─ index.ts
```