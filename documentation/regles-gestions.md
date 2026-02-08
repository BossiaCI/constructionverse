Contraintes d'Intégrité
Contraintes Métier:

User & Company:

Un User DOIT appartenir à exactement UNE Company
Un User ne peut pas être transféré entre Companies
La suppression d'une Company en cascade supprime tous ses Users (soft delete recommandé)


Project & Tasks:

Un Task DOIT appartenir à un Project
Un Task ne peut pas être déplacé entre Projects
Un Task parent DOIT être dans le même Project que ses subtasks


BIM & Elements:

Un IFCElement DOIT appartenir à un BIMModel
Un IFCElement DOIT avoir exactement UNE Geometry
La suppression d'un BIMModel supprime tous ses IFCElements


IoT & Devices:

Un IoTDevice DOIT être associé à un Project
Un Sensor DOIT appartenir à un IoTDevice
Un SensorReading DOIT référencer un Sensor existant
Les readings plus anciens que 1 an peuvent être archivés


Schedule & Dependencies:

Un ScheduledTask ne peut pas dépendre de lui-même (cycle detection)
Les dépendances circulaires sont interdites
Un ScheduledTask DOIT avoir une duration_days > 0


VR Sessions:

Un VRSession DOIT avoir au moins un host (creator)
max_participants DOIT être >= nombre de current_participants
Un participant ne peut pas rejoindre deux fois la même session


Dimensions BIM:

Un IFCElement peut avoir au maximum UNE instance de chaque Dimension (4D, 5D, 6D, 7D)
Dimension4D.actual_finish DOIT être >= actual_start
Dimension5D.total_cost DOIT être >= 0




🎯 NOTES D'IMPLÉMENTATION
Ordre de Développement Recommandé

Phase 1 - Core Infrastructure (Semaines 1-2)

Identity & Access Management
Basic Project Management
Database setup


Phase 2 - BIM Core (Semaines 3-6)

IFC Parser
Geometry Processing
Element Management


Phase 3 - Project Management (Semaines 7-10)

Tasks avec toutes les fonctionnalités
Comments & Attachments
Collaboration


Phase 4 - Scheduling (Semaines 11-14)

CPM Algorithm
Resource Management
Earned Value


Phase 5 - IoT (Semaines 15-18)

Device Registry
Sensors & Readings
Alerts & Automation


Phase 6 - VR Experience (Semaines 19-22)

Session Management
Multi-user Collaboration
3D Annotations


Phase 7 - Advanced Features (Semaines 23-26)

Analytics
Advanced BIM (4D-7D)
Reporting